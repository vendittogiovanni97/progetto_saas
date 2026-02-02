/**
 * Hook per gestire il form di login
 */

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, LoginFormErrors } from "../types";

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateForm = (data: LoginFormData): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: LoginFormData
  ) => {
    e.preventDefault();

    if (!validateForm(data)) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // TODO: Integrare con API di autenticazione
      // const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
      // authManager.setTokens(...);

      // Simulazione login per ora
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect al dashboard dopo login
      router.push("/dashboard");
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errors,
    handleSubmit,
    setErrors,
  };
}
