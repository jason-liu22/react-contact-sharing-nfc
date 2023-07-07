import { useState } from "react";
import { Box, Grid, Stack, Typography, IconButton } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import useMode from "../hooks/useMode";
import useFieldEdit from "../hooks/useFieldEdit";
import VCardFileCreator from "./VCardFileCreator";
import { UserDataContextType } from "../providers/UserDataProvider";
import QRCode from "./QRCode";
import UploadFile from "./UploadFile";

function UserInfo({ userData }: { userData: UserDataContextType }) {
  const { mode } = useMode();
  const [showQRcode, setShowQRcode] = useState(false);
  const { updateField } = useFieldEdit();

  return (
    <Box>
      <Box sx={{ bgcolor: "primary.main", py: 1 }}>
        {!showQRcode ? (
          <Grid container>
            <Grid item xs={5}>
              <UploadFile
                sx={{ height: 200 }}
                fieldName="avatar"
                mode={mode}
                uid={userData.uid}
                url={userData.avatar || "/avatar.png"}
              />
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  // p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: "#000000",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {mode === "user-view" && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          updateField({
                            name: "firstname",
                            label: "First Name",
                            value: (userData?.firstname as string) || "",
                          });
                        }}
                      >
                        <BorderColorOutlinedIcon
                          sx={{ color: "white", width: 16, height: 16 }}
                        />
                      </IconButton>
                    )}
                    <Typography variant="subtitle1" color="primary.main">
                      {userData?.firstname || "First Name"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {mode === "user-view" && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          updateField({
                            name: "lastname",
                            label: "Last Name",
                            value: (userData?.lastname as string) || "",
                          });
                        }}
                      >
                        <BorderColorOutlinedIcon
                          sx={{ color: "white", width: 16, height: 16 }}
                        />
                      </IconButton>
                    )}
                    <Typography variant="subtitle1" color="white">
                      {userData?.lastname || "Last Name"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {mode === "user-view" && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          updateField({
                            name: "occupation",
                            label: "Occupation",
                            value: (userData?.occupation as string) || "",
                          });
                        }}
                      >
                        <BorderColorOutlinedIcon
                          sx={{ color: "white", width: 16, height: 16 }}
                        />
                      </IconButton>
                    )}
                    <Typography variant="subtitle2" color="white">
                      {userData?.occupation || "Occupation"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {mode === "user-view" && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          updateField({
                            name: "company",
                            label: "Company Name",
                            value: (userData?.company as string) || "",
                          });
                        }}
                      >
                        <BorderColorOutlinedIcon
                          sx={{ color: "white", width: 16, height: 16 }}
                        />
                      </IconButton>
                    )}
                    <Typography variant="subtitle2" color="white">
                      {userData?.company || "Company Name"}
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "end",
                    px: 2,
                    pb: 1,
                  }}
                >
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowQRcode(true);
                    }}
                  >
                    <QRCode uid={userData.uid} size={28} id="small-qrcode" />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              p: 2,
              position: "relative",
              display: "flex",
              bgcolor: "#000000",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode uid={userData.uid} size={168} id="userinfor-qrcode" />
            <img
              width="30"
              alt="user_profile"
              src="/user_profile.png"
              onClick={() => {
                setShowQRcode(false);
              }}
              style={{ position: "absolute", right: "16px", bottom: "16px" }}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            mr: "-11px",
            borderRight: (theme) => `30px solid ${theme.palette.primary.main}`,
            transform: "skew(35deg)",
            width: 30,
            height: 30,
          }}
        />
        <Box
          sx={{
            px: 2,
            height: 30,
            display: "flex",
            alignItems: "center",
            bgcolor: "primary.main",
          }}
        >
          <VCardFileCreator
            firstName={userData?.firstname || ""}
            lastName={userData?.lastname || ""}
            title={userData?.occupation || ""}
            company={userData?.company || ""}
            mobile={userData?.phone || ""}
            email={userData?.email || ""}
            location={userData?.location || ""}
            website={userData?.website || ""}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UserInfo;
