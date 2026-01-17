/**
 * Header della pagina Clients con search e filtri
 */

import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { Client } from "../types";

interface ClientsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: Client["status"] | "all";
  onStatusFilterChange: (value: Client["status"] | "all") => void;
  planFilter: Client["plan"] | "all";
  onPlanFilterChange: (value: Client["plan"] | "all") => void;
  onCreateClient: () => void;
}

export function ClientsHeader({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  planFilter,
  onPlanFilterChange,
  onCreateClient,
}: ClientsHeaderProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem" },
              mb: 1,
            }}
          >
            Clients{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              {"//"}
            </Box>{" "}
            Management
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.875rem", md: "1rem" },
              letterSpacing: "0.05em",
            }}
          >
            MANAGE YOUR CLIENTS AND RELATIONSHIPS
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={onCreateClient}
          startIcon={
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 18 }}
            >
              add
            </Box>
          }
          sx={{
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          New Client
        </Button>
      </Box>

      <Box
        sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}
      >
        <TextField
          placeholder="Search clients..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  component="span"
                  className="material-symbols-outlined"
                  sx={{ fontSize: 20, color: "text.secondary" }}
                >
                  search
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            flex: { xs: "1 1 100%", sm: "1 1 auto" },
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              bgcolor: alpha(theme.palette.background.paper, 0.3),
            },
          }}
        />

        <Select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as Client["status"] | "all")
          }
          size="small"
          sx={{
            minWidth: 140,
            "& .MuiOutlinedInput-root": {
              bgcolor: alpha(theme.palette.background.paper, 0.3),
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>

        <Select
          value={planFilter}
          onChange={(e) =>
            onPlanFilterChange(e.target.value as Client["plan"] | "all")
          }
          size="small"
          sx={{
            minWidth: 160,
            "& .MuiOutlinedInput-root": {
              bgcolor: alpha(theme.palette.background.paper, 0.3),
            },
          }}
        >
          <MenuItem value="all">All Plans</MenuItem>
          <MenuItem value="basic">Basic</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="enterprise">Enterprise</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
