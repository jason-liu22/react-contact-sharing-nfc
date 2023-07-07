import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import PasswordField from "./PasswordField";

export default function AlertDialog({
  open,
  handleClose,
  handleAgree,
}: {
  open: boolean;
  handleClose: () => void;
  handleAgree: (password: string) => void;
}) {
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleAgree(password);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText sx={{ color: "red", mb: 2 }}>
            Etes-vous sûr(e) de vouloir supprimer votre compte ?
          </DialogContentText>
          <PasswordField
            password={password}
            label="Password"
            onChange={(v) => setPassword(v)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="contained" color="error" type="submit">
            CONTINUER
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
