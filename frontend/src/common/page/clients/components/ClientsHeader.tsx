/**
 * Header della pagina Clients con search e filtri
 */

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Icon,
} from "@mui/material";
import { ButtonGeneric } from "@/common/components/button/ButtonGeneric";
import { PageHeaderGeneric } from "@/common/components/header/PageHeaderGeneric";
import { 
  IconAdd, 
  IconSearch 
} from "@/common/icons/icons";
import { useTheme, alpha } from "@mui/material/styles";
import { Client } from "../types/types";

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
      <PageHeaderGeneric 
        title="Clients // Management"
        subtitle="MANAGE YOUR CLIENTS AND RELATIONSHIPS"
        actions={(
          <ButtonGeneric.Primary
            onClick={onCreateClient}
            startIcon={<IconAdd sx={{ fontSize: 18 }} />}
            label="New Client"
          />
        )}
      />

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
                  <IconSearch sx={{ fontSize: 20, color: "text.secondary" }} />
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
