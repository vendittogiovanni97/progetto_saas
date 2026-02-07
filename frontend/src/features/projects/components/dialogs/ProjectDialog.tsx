"use client";

import { useState, useEffect } from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { InputGeneric } from "@/components/ui/input";
import { ButtonGeneric } from "@/components/ui/button";
import { ModalGeneric } from "@/components/ui/modal";
import { ProjectWithRelations, CreateProjectDTO, ProjectStatus } from "../../interfaces/Project.entity";
import { getCategories } from "../../services/services";
import { SelectGeneric } from "@/components/ui/select";

interface ProjectDialogProps {
  open: boolean;
  project: ProjectWithRelations | null;
  onClose: () => void;
  onSave: (data: CreateProjectDTO) => void;
}

export function ProjectDialog({
  open,
  project,
  onClose,
  onSave,
}: ProjectDialogProps) {
  const theme = useTheme();
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState<CreateProjectDTO>({
    name: "",
    categoryId: 0,
    accountId: 1, // TODO: Get from auth
  });

  useEffect(() => {
    if (open) {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data || []);
          if (!project && data && data.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: data[0].id }));
          }
        } catch (err) {
          console.error("Error fetching categories:", err);
        }
      };
      fetchCategories();
    }
  }, [open, project]);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        categoryId: project.categoryId,
        accountId: project.accountId,
        structure: project.getParsedStructure() || undefined,
      });
    } else {
      setFormData({
        name: "",
        categoryId: categories.length > 0 ? categories[0].id : 0,
        accountId: 1,
      });
    }
  }, [project, open, categories]);

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
        placeholder="E.g. My Awesome Project"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <SelectGeneric
        label="Category"
        value={formData.categoryId}
        onChange={(e) =>
          setFormData({
            ...formData,
            categoryId: Number(e.target.value),
          })
        }
        options={categories.map(cat => ({
          value: cat.id,
          label: cat.name
        }))}
      />

      <Box sx={{ p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2, border: `1px dashed ${theme.palette.info.main}` }}>
        <Typography variant="caption" color="info.main" sx={{ display: 'block', mb: 1, fontWeight: 700 }}>
          CONFIGURATION STRUCTURE (JSON)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The structure will be automatically initialized based on the selected category template.
        </Typography>
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

