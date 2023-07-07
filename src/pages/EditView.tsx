import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NFC from "../components/NFC";
import QRCodeDownloader from "../components/QRCodeDownloader";
import UserInfo from "../components/UserInfo";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

function EditView() {
  const userData = useAuth();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3 * 1000);
    }
  }, [copied]);

  if (!!userData) {
    return (
      <Stack spacing={1} sx={{ px: { xs: 3, sm: 0 } }}>
        <UserInfo userData={userData} />
        <NFC uid={userData.uid} />
        <QRCodeDownloader uid={userData.uid} />
        <Box sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">
              <Link
                href={
                  window.location.protocol +
                  "//" +
                  window.location.hostname +
                  "/card/" +
                  userData.uid
                }
              >
                Go to my public link
              </Link>
            </Typography>
            <CopyToClipboard
              text={
                window.location.protocol +
                "//" +
                window.location.hostname +
                "/card/" +
                userData.uid
              }
              onCopy={() => setCopied(true)}
            >
              <Chip
                label={copied ? " Votre lien est copié" : "Copier"}
                data-clipboard-text={
                  window.location.protocol +
                  "//" +
                  window.location.hostname +
                  "/card/" +
                  userData.uid
                }
                sx={{ ml: "auto" }}
              />
            </CopyToClipboard>
          </Box>
        </Box>
      </Stack>
    );
  } else {
    return null;
  }
}

export default EditView;
