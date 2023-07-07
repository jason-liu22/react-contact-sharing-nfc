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
import { logInWithEmailAndPassword } from "../firebase";
import { AuthError } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
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
    logInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("auth success: ", res);
      })
      .catch((err) => {
        const errorMessage = (err as AuthError).message;
        console.log(errorMessage);
        if (errorMessage.includes("user-not-found")) {
          setMessage("User doesn't exist");
        } else if (errorMessage.includes("wrong-password")) {
          setMessage("Password is incorrect");
        } else {
          setMessage("Something went wrong");
        }
      });
  };

  return (
    <Box component="form" id="login-form" onSubmit={handleSubmit}>
      <Typography className="description" sx={{ mb: 2 }}>
        <span>Welcome to React-Contact-Sharing</span>
        <br />
        <span>Please login</span>
      </Typography>
      <TextField
        required
        type="email"
        label="Email"
        placeholder="y1@test.com"
        sx={{ mb: 2 }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl required variant="outlined" sx={{ mb: 3 }}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          placeholder="123456"
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
        Login
      </Button>
      <Typography textAlign="center">
        <span>Do not have an account yet ?</span>
        <br />
        <Link to="/auth/register">Register</Link>
      </Typography>
    </Box>
  );
}

export default Login;
