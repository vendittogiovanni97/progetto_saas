/**
 * Componente form di login
 */

import { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { InputGeneric } from "@/components/ui/input";
import { ButtonGeneric } from "@/components/ui/button";
import { 
  Person as PersonIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon, 
  VisibilityOff as VisibilityOffIcon 
} from "@mui/icons-material";
import { useTheme, alpha } from "@mui/material/styles";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: "", // Changed from email to username
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, errors, handleSubmit } = useLogin();

  // Modified handleChange to handleFieldChange for direct value updates
  const handleFieldChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
  };

  // Original handleChange for Checkbox
  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "rememberMe" ? e.target.checked : e.target.value;
      setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
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

      <InputGeneric
        label="USERNAME"
        placeholder="ENTER_IDENTITY"
        value={formData.username}
        onChange={(e) => handleFieldChange("username", e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
        sx={{ mb: 2 }}
      />

      <InputGeneric
        label="PASSWORD"
        placeholder="VERIFY_ACCESS"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={(e) => handleFieldChange("password", e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        endIcon={
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
            size="small"
          >
            {showPassword ? (
              <VisibilityOffIcon sx={{ fontSize: 20 }} />
            ) : (
              <VisibilityIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        }
        sx={{ mb: 1 }}
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
        <ButtonGeneric.Ghost
          label="Forgot password?"
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            textTransform: "none",
            "&:hover": {
              color: "primary.main",
            },
          }}
        />
      </Box>

      <ButtonGeneric.Primary
        type="submit"
        fullWidth
        loading={loading}
        label="SIGN IN"
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
      />
    </Box>
  );
}
