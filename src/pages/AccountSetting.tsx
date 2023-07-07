import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import UserEditIcon from "../components/icons/UserEditIcon";
import PasswordLockIcon from "../components/icons/PasswordLockIcon";
import ProfileDeleteIcon from "../components/icons/ProfileDeleteIcon";
import ColorFilterIcon from "../components/icons/ColorFilterIcon";
import useFieldEdit from "../hooks/useFieldEdit";
import useAuth from "../hooks/useAuth";
import {
  changePassword,
  removeUser,
  // sendPasswordReset,
  updateFieldOnUserDocument,
} from "../firebase";
import AlertDialog from "../components/AlertDialog";
import PasswordChangeDialog from "../components/PasswordChangeDialog";

function AccountSetting() {
  const { updateField } = useFieldEdit();
  const userData = useAuth();
  const [open, setOpen] = useState(false);
  const [showPasswordUpdateDialog, setShowPasswordUpdateDialog] =
    useState(false);

  if (!!userData) {
    return (
      <Stack spacing={2} sx={{ px: { xs: 3, sm: 0 } }}>
        <Box
          sx={{
            py: 2,
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={() => {
            updateField({
              name: "name",
              label: "Identifiant",
              value: (userData?.name as string) || "",
            });
          }}
        >
          <UserEditIcon sx={{ color: "white", mr: 2 }} />
          <Typography variant="h5">Change username</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            py: 2,
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={() => {
            setShowPasswordUpdateDialog(true);
          }}
        >
          <PasswordLockIcon sx={{ color: "white", mr: 2 }} />
          <Typography variant="h5">Change Password</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            py: 2,
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <ProfileDeleteIcon sx={{ color: "white", mr: 2 }} />
          <Typography variant="h5">Delete account</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            py: 2,
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <ColorFilterIcon sx={{ color: "white", mr: 2 }} />
          <Typography variant="h5">Change theme color</Typography>
        </Box>
        <Stack direction="row" spacing={2} pl={5}>
          {[
            "#E23B4D",
            "#FEC007",
            "#74D675",
            "#56A7B2",
            "#4FA7EE",
            "#7B61FF",
            "#414141",
          ].map((c) => (
            <Box
              key={c}
              sx={{
                p: "2px",
                cursor: "pointer",
                borderRadius: "50%",
                border: `2px solid ${userData.color === c ? c : "white"}`,
                "&:hover": { border: `2px solid ${c}` },
              }}
              onClick={() => {
                updateFieldOnUserDocument(userData.uid, "color", c);
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: c,
                  borderRadius: "50%",
                }}
              />
            </Box>
          ))}
        </Stack>
        {open && (
          <AlertDialog
            open={open}
            handleClose={() => setOpen(false)}
            handleAgree={(password: string) => {
              removeUser(password);
            }}
          />
        )}
        {showPasswordUpdateDialog && (
          <PasswordChangeDialog
            open={showPasswordUpdateDialog}
            handleClose={() => setShowPasswordUpdateDialog(false)}
            handleSave={(password, newPassword) => {
              changePassword(password, newPassword).then(() => {
                setShowPasswordUpdateDialog(false);
              });
            }}
          />
        )}
      </Stack>
    );
  } else {
    return null;
  }
}

export default AccountSetting;
