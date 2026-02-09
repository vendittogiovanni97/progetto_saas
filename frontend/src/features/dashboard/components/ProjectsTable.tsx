import {Typography, Chip, alpha} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SectionGeneric } from "@/components/ui/section";
import { TableGenericColumn, TableGeneric } from "@/components/table/TableGeneric";
import { Project } from "@/features/projects/interfaces/Project.entity";
import { formatDate } from "@/utils/dateUtils";
import { getTypeColor } from "@/utils/projectUtils";


interface ProjectsTableProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

export function ProjectsTable({
  projects,
  onProjectClick,
}: ProjectsTableProps) {
  const theme = useTheme();

  const columns: TableGenericColumn<Project>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      width: 80,
      cell: (value) => (
        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
          #{value}
        </Typography>
      ),
    },
    {
      id: "name",
      header: "Project Name",
      accessorKey: "name",
      cell: (value) => (
        <Typography sx={{ fontWeight: 700, color: "primary.main" }}>{value}</Typography>
      ),
    },
    {
      id: "categoryId",
      header: "Category",
      accessorKey: "categoryId",
      width: 120,
      cell: (value, row) => (
        <Chip
          label={value === 1 ? "CHATBOT" : "GENERIC"}
          size="small"
          color={getTypeColor(row.categoryId)}
          variant="outlined"
          sx={{
            fontSize: "0.6rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            height: 22,
            borderRadius: 1,
            borderWidth: 2,
            bgcolor: alpha(theme.palette[getTypeColor(row.categoryId)]?.main || theme.palette.primary.main, 0.05),
          }}
        />
      ),
    },
    {
      id: "updatedAt",
      header: "Last Update",
      accessorKey: "updatedAt",
      width: 160,
      align: "right",
      cell: (value) => (
        <Typography sx={{ fontSize: "0.75rem", fontFamily: 'monospace' }}>
          {formatDate(String(value))}
        </Typography>
      ),
    },
  ];

  return (
    <SectionGeneric title="Active Projects System" showDivider={false}>
      <TableGeneric
        data={projects}
        columns={columns}
        enableSorting
        onRowClick={(row) => onProjectClick(String(row.id))}
        emptyMessage="No projects available"
      />
    </SectionGeneric>
  );
}
