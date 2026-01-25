/**
 * Componente form di login
 */

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { LoginFormData, LoginFormErrors } from "../types";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const theme = useTheme();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, errors, handleSubmit } = useLogin();

  const handleChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "rememberMe" ? e.target.checked : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e, formData)}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      {errors.general && (
        <Alert
          severity="error"
          sx={{
            bgcolor: alpha(theme.palette.error.main, 0.1),
            border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
            color: theme.palette.error.main,
          }}
        >
          {errors.general}
        </Alert>
      )}

      <TextField
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        required
        autoComplete="email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="span"
                className="material-symbols-outlined"
                sx={{ fontSize: 20, color: "text.secondary" }}
              >
                person
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: alpha(theme.palette.background.paper, 0.3),
            "& fieldset": {
              borderColor: theme.palette.divider,
            },
            "&:hover fieldset": {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
          "& .MuiInputLabel-root": {
            color: "text.secondary",
            "&.Mui-focused": {
              color: "primary.main",
            },
          },
        }}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange("password")}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        required
        autoComplete="current-password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="span"
                className="material-symbols-outlined"
                sx={{ fontSize: 20, color: "text.secondary" }}
              >
                lock
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: "text.secondary" }}
              >
                <Box
                  component="span"
                  className="material-symbols-outlined"
                  sx={{ fontSize: 20 }}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </Box>
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: alpha(theme.palette.background.paper, 0.3),
            "& fieldset": {
              borderColor: theme.palette.divider,
            },
            "&:hover fieldset": {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
          "& .MuiInputLabel-root": {
            color: "text.secondary",
            "&.Mui-focused": {
              color: "primary.main",
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleChange("rememberMe")}
              sx={{
                color: "text.secondary",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
              Remember me
            </Typography>
          }
        />
        <Button
          variant="text"
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            textTransform: "none",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          Forgot password?
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          py: 1.5,
          fontSize: "0.875rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          "&:hover": {
            boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
        }}
      >
        {loading ? "Authenticating..." : "Sign In"}
      </Button>
    </Box>
  );
}
