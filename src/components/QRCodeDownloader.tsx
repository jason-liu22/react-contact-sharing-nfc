import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QRCode from "./QRCode";

type Props = {
  uid: string;
};

function QRCodeDownloader({ uid }: Props) {
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById(
      "generated-qrcode"
    ) as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          pl: 2,
          borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
        }}
      >
        QR Code
      </Typography>
      <Stack spacing={2} alignItems="center">
        <QRCode uid={uid} size={320} id="generated-qrcode" />
        <Button
          size="small"
          variant="contained"
          sx={{ borderRadius: 0 }}
          onClick={downloadQRCode}
        >
          Download my QR Code
        </Button>
      </Stack>
    </>
  );
}

export default QRCodeDownloader;
