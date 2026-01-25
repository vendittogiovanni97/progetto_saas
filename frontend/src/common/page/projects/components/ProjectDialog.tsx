"use client";

import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Slider,
  Typography,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { ModalGeneric } from "@/common/components/modal/ModalGeneric";
import { Project, ProjectFormData, ProjectStatus } from "../types";

interface ProjectDialogProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
}

export function ProjectDialog({
  open,
  project,
  onClose,
  onSave,
}: ProjectDialogProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    status: "Active",
    progress: 0,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        status: project.status,
        progress: project.progress,
      });
    } else {
      setFormData({
        name: "",
        status: "Active",
        progress: 0,
      });
    }
  }, [project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const dialogContent = (
    <Box
      component="form"
      id="project-form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pt: 1,
      }}
    >
      <TextField
        label="Project Name"
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

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as ProjectStatus,
            })
          }
          label="Status"
          sx={{
            bgcolor: alpha(theme.palette.background.paper, 0.3),
          }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Paused">Paused</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Error">Error</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Typography gutterBottom sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 2 }}>
          PROGRESS: {formData.progress}%
        </Typography>
        <Slider
          value={formData.progress}
          onChange={(_, value) => setFormData({ ...formData, progress: value as number })}
          valueLabelDisplay="auto"
          step={5}
          marks
          min={0}
          max={100}
        />
      </Box>
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
        form="project-form"
        variant="contained"
        size="small"
      >
        {project ? "Update" : "Create"} Project
      </Button>
    </>
  );

  return (
    <ModalGeneric
      open={open}
      onClose={onClose}
      title={project ? "Edit Project" : "New Project"}
      content={dialogContent}
      actions={dialogActions}
      maxWidth="sm"
    />
  );
}
