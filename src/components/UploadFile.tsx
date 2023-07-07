import { useState } from "react";
import { Box, IconButton, BoxProps } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { uploadFile } from "../firebase";

function UploadFile({
  uid,
  mode,
  width,
  height,
  fieldName,
  url,
  sx,
}: {
  width?: string;
  height?: string;
  uid: string;
  mode: "live-view" | "user-view";
  url: string;
  fieldName: string;
} & BoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const handleUploadSuccess = (url: string) => {
    console.log("Uploaded successfully: ", url);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <img
        width={width || "100%"}
        height={height || "100%"}
        // height="160"
        alt={fieldName}
        src={!!file ? URL.createObjectURL(file) : url}
        style={{ objectFit: "cover" }}
      />
      {mode === "user-view" && (
        <IconButton
          aria-label="upload picture"
          component="label"
          size="small"
          sx={{
            position: "absolute",
            left: "8px",
            bottom: "8px",
            bgcolor: "white",
          }}
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                uploadFile(
                  e.target.files[0],
                  uid,
                  fieldName,
                  handleUploadSuccess
                );
              }
            }}
          />
          <PhotoCamera />
        </IconButton>
      )}
    </Box>
  );
}

export default UploadFile;
