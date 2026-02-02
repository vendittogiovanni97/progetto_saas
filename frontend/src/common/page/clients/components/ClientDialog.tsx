/**
 * Dialog per creare/editing client
 */

import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { ModalGeneric } from "@/common/components/modal/ModalGeneric";
import { Client, ClientFormData } from "../types/types";

interface ClientDialogProps {
  open: boolean;
  client: Client | null;
  onClose: () => void;
  onSave: (data: ClientFormData) => void;
}

export function ClientDialog({
  open,
  client,
  onClose,
  onSave,
}: ClientDialogProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    company: "",
    plan: "basic",
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        company: client.company || "",
        plan: client.plan,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        company: "",
        plan: "basic",
      });
    }
  }, [client, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const dialogContent = (
    <Box
      component="form"
      id="client-form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        pt: 1,
      }}
    >
      <TextField
        label="Client Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: alpha(theme.palette.background.paper, 0.3),
          },
        }}
      />
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        required
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: alpha(theme.palette.background.paper, 0.3),
          },
        }}
      />
      <TextField
        label="Company (Optional)"
        value={formData.company}
        onChange={(e) =>
          setFormData({ ...formData, company: e.target.value })
        }
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: alpha(theme.palette.background.paper, 0.3),
          },
        }}
      />
      <FormControl fullWidth>
        <InputLabel>Plan</InputLabel>
        <Select
          value={formData.plan}
          onChange={(e) =>
            setFormData({
              ...formData,
              plan: e.target.value as Client["plan"],
            })
          }
          label="Plan"
          sx={{
            bgcolor: alpha(theme.palette.background.paper, 0.3),
          }}
        >
          <MenuItem value="basic">Basic</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="enterprise">Enterprise</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  const dialogActions = (
    <>
      <Button
        onClick={onClose}
        variant="outlined"
        size="small"
        sx={{ color: "text.secondary", borderColor: theme.palette.divider }}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="client-form"
        variant="contained"
        size="small"
      >
        {client ? "Update" : "Create"} Client
      </Button>
    </>
  );

  return (
    <ModalGeneric
      open={open}
      onClose={onClose}
      title={client ? "Edit Client" : "New Client"}
      content={dialogContent}
      actions={dialogActions}
      maxWidth="sm"
    />
  );
}

