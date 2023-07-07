import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordField({
  label,
  onChange,
  password,
}: {
  label: string;
  onChange: (v: string) => void;
  password: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth required variant="outlined" sx={{ mb: 3 }}>
      <InputLabel htmlFor={`outlined-adornment-password-${label}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={`outlined-adornment-password-${label}`}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
}

export default PasswordField;
