"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { InputGeneric } from "@/components/ui/input";
import { SelectGeneric } from "@/components/ui/select";
import { ButtonGeneric } from "@/components/ui/button";
import { ModalGeneric } from "@/components/ui/modal";
import { ProjectType } from "@/types/shared.types";
import { CreateProjectDTO, Project } from "../../interfaces/Project.entity";

interface ProjectDialogProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (data: CreateProjectDTO) => void;
}

export function ProjectDialog({
  open,
  project,
  onClose,
  onSave,
}: ProjectDialogProps) {
  const [formData, setFormData] = useState<CreateProjectDTO>({
    name: "",
    type: ProjectType.CHATBOT,
    accountId: 1, // TODO: Get from auth
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || undefined,
        type: project.type,
        accountId: project.accountId,
      });
    } else {
      setFormData({
        name: "",
        type: ProjectType.CHATBOT,
        accountId: 1,
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

      <InputGeneric
        label="Description"
        value={formData.description || ""}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        multiline
        rows={3}
      />

      <SelectGeneric
        label="Type"
        value={formData.type}
        onChange={(e) =>
          setFormData({
            ...formData,
            type: e.target.value as ProjectType,
          })
        }
        options={[
          { value: ProjectType.CHATBOT, label: "Chatbot" },
          { value: ProjectType.FORM, label: "Form" },
          { value: ProjectType.WORKFLOW, label: "Workflow" },
          { value: ProjectType.API, label: "API" },
        ]}
      />
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
