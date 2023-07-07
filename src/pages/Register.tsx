import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerWithEmailAndPassword } from "../firebase";
import { AuthError } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    registerWithEmailAndPassword(username, email, password)
      .then((res) => {
        console.log("register success");
      })
      .catch((err) => {
        const errorMessage = (err as AuthError).message;
        if (errorMessage.includes("weak-password")) {
          setMessage("Password must be at least 6 characters");
        } else if (errorMessage.includes("email-already-in-use")) {
          setMessage("This email address is already in use");
        } else {
          setMessage("Something went wrong");
        }
      });
  };

  return (
    <Box component="form" id="register-form" onSubmit={handleSubmit}>
      <Typography className="description" sx={{ mb: 2 }}>
        <span>Create an account to join the network</span>
      </Typography>
      <TextField
        required
        type="email"
        label="Email"
        placeholder="Email"
        sx={{ mb: 2 }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        type="text"
        label="Username"
        placeholder="Username"
        sx={{ mb: 2 }}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl required variant="outlined" sx={{ mb: 3 }}>
        <InputLabel htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      {!!message && (
        <Typography textAlign="center" color="error" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: "0px", mb: 2 }}
        size="large"
      >
        Register
      </Button>
      <Typography textAlign="center">
        <span>Already have an account ?</span>
        <br />
        <Link to="/auth/login">Login</Link>
      </Typography>
    </Box>
  );
}

export default Register;
