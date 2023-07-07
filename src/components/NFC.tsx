// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import { DialogActions, DialogTitle } from "@mui/material";

function NFC({ uid }: { uid: string }) {
  const [message, setMessage] = useState("");
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const num = useRef(0);

  // useEffect(() => {
  //   if (message) {
  //     setTimeout(() => {
  //       setMessage("");
  //     }, 5 * 1000);
  //   }
  // }, [message]);

  const scan = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();

        // console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          // console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event: any) => {
          // console.log("NDEF message read.");
          onReading(event);
        };
      } catch (error) {
        // console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  };

  const onReading = (event: any) => {
    // console.log(event.message, event.serialNumber);
    for (const record of event.message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          // console.log(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  const onWrite = async (uid) => {
    try {
      // console.log(num.current);
      const ndef = new window.NDEFReader();
      // This line will avoid showing the native NFC UI reader
      await ndef.scan();
      await ndef.write({
        records: [
          {
            recordType: "url",
            data:
              window.location.protocol +
              "//" +
              window.location.hostname +
              "/card/" +
              uid,
          },
        ],
      });
      num.current = 0;
      setLoading(false);
      setMessage("NFC Tag writing completed successfully");
    } catch (error) {
      if (num.current < 6) {
        num.current = num.current + 1;
        onWrite(uid);
      } else {
        num.current = 0;
        setLoading(false);
        setMessage(
          "An error has occurred. Please check that there is an NFC card nearby and your device is compatible"
        );
      }
    }
  };

  useEffect(() => {
    scan();
  }, [uid]);

  // console.log(showLoadingDialog, message, loading, num);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          pl: 2,
          borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
        }}
      >
        NFC
      </Typography>

      <Stack spacing={2} alignItems="center">
        <img
          src="/nfc.png"
          alt="NFC image"
          width="45"
          height="45"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <Button
          size="small"
          variant="contained"
          sx={{ borderRadius: 0 }}
          onClick={() => {
            num.current = 0;
            setLoading(true);
            setShowLoadingDialog(true);
            onWrite(uid);
          }}
        >
          Write NFC tag
        </Button>
        <Typography textAlign="center" variant="body2">
          To write an NFC tag you must connect to a device Mobile
        </Typography>
      </Stack>
      <Dialog
        open={showLoadingDialog}
        aria-labelledby="loading-dialog-title"
        aria-describedby="loading-dialog-description"
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          In writing...
        </DialogTitle>
        <DialogContent
          sx={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{message}</Typography>
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button
            color="info"
            onClick={() => {
              num.current = 0;
              setMessage("");
              setLoading(false);
              setShowLoadingDialog(false);
            }}
          >
            Close
          </Button>
          {message ===
            "Une erreur est survenue. Merci de vérifier la présence d'une carte NFC à proximité et que votre appareil est compatible" && (
            <Button
              color="success"
              onClick={() => {
                num.current = 0;
                setMessage("");
                setLoading(true);
                onWrite(uid);
              }}
            >
              Restart
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NFC;
