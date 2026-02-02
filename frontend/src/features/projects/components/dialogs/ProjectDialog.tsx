"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Slider,
  Typography,
} from "@mui/material";
import { InputGeneric } from "@/components/ui/input";
import { SelectGeneric } from "@/components/ui/select";
import { ButtonGeneric } from "@/components/ui/button";
import { ModalGeneric } from "@/components/ui/modal";
import { Project, ProjectFormData, ProjectStatus } from "../../types/types";

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
      <InputGeneric
        label="Project Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <SelectGeneric
        label="Status"
        value={formData.status}
        onChange={(e) =>
          setFormData({
            ...formData,
            status: e.target.value as ProjectStatus,
          })
        }
        options={[
          { value: "Active", label: "Active" },
          { value: "Paused", label: "Paused" },
          { value: "Pending", label: "Pending" },
          { value: "Error", label: "Error" },
        ]}
      />

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
      <ButtonGeneric.Secondary onClick={onClose} label="Cancel" />
      <ButtonGeneric.Primary
        type="submit"
        form="project-form"
        label={project ? "Update Project" : "Create Project"}
      />
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
