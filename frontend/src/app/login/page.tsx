"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { 
  Box, 
  Paper, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Alert, 
  IconButton 
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/providers/AuthProvider";
import { IconSecurity } from "@/components/icons/icons";
import { InputGeneric } from "@/components/ui/input";
import { ButtonGeneric } from "@/components/ui/button";
import { loginRequest } from "@/services/AuthenticationServices";


export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    try {
      const token = await loginRequest(email, password);
      login(token, rememberMe);
      router.push("/dashboard");
    } catch (error: any) {
      setErrors({
        general: error.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 100%)`,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440, px: 3 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <IconSecurity sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography variant="h1" sx={{ fontSize: "1.875rem", fontWeight: 700, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            NEXUS_OS
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            ACCESS CONTROL SYSTEM
          </Typography>
        </Box>

        <Paper
          sx={{
            p: 4,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 700, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Sign In
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
              Enter your credentials to access the platform
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {errors.general && (
              <Alert severity="error" sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`, color: theme.palette.error.main }}>
                {errors.general}
              </Alert>
            )}

            <InputGeneric
              label="EMAIL"
              placeholder="ENTER_EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />

            <InputGeneric
              label="PASSWORD"
              placeholder="VERIFY_ACCESS"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              endIcon={
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                  {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                </IconButton>
              }
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ color: "text.secondary", "&.Mui-checked": { color: "primary.main" } }}
                  />
                }
                label={<Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>Remember me</Typography>}
              />
              <ButtonGeneric.Ghost label="Forgot password?" sx={{ fontSize: "0.875rem", color: "text.secondary", textTransform: "none", "&:hover": { color: "primary.main" } }} />
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
                "&:hover": { boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}` },
              }}
            />
          </Box>
        </Paper>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            {process.env.NEXT_PUBLIC_APP_VERSION}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
