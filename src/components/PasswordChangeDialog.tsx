import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import PasswordField from "./PasswordField";

export default function PasswordChangeDialog({
  open,
  handleClose,
  handleSave,
}: {
  open: boolean;
  handleClose: () => void;
  handleSave: (password: string, newPassword: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSave(password, newPassword);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Input old and new password
          </DialogContentText>
          <PasswordField
            password={password}
            label="Ancien Mot de passe"
            onChange={(v) => setPassword(v)}
          />
          <PasswordField
            password={newPassword}
            label="Votre nouveau mot de passe"
            onChange={(v) => setNewPassword(v)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" color="error">
            Enregistrer
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
