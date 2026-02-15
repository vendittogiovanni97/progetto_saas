"use client";

import React from "react";
import { Box, Typography, Grid, alpha, useTheme } from "@mui/material";
import { FormGeneric } from "@/components/forms/formGeneric";
import { getStructure } from "@/utils/structureRegistry";

// Importa tutte le strutture per attivare la auto-registrazione
import "@/structure/chatbot/structureChatbot";

interface FormProjectProps {
  categoryId: number;
  config: Record<string, any>;
  onConfigChange: (attributeName: string, value: any) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
  loading?: boolean;
  isEditing?: boolean;
}

export function FormProject({
  categoryId,
  config,
  onConfigChange,
  onSave,
  onCancel,
  saveLabel,
  loading = false,
  isEditing = false,
}: FormProjectProps) {
  const theme = useTheme();
  const structureConfig = getStructure(categoryId);

  if (!structureConfig) {
    return (
      <Box sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Struttura non disponibile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nessuna configurazione trovata per questa categoria.
        </Typography>
      </Box>
    );
  }

  const { sections, previewComponent: PreviewComponent } = structureConfig;
  const hasPreview = !!PreviewComponent;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: hasPreview ? 6 : 12 }}>
          <FormGeneric
            sections={sections}
            config={config}
            onConfigChange={onConfigChange}
            onSave={onSave}
            onCancel={onCancel}
            saveLabel={saveLabel}
            loading={loading}
          />
        </Grid>

        {hasPreview && PreviewComponent && (
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(theme.palette.divider, 0.05),
              borderRadius: 4,
              py: 4,
              border: `1px dashed ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="overline"
              sx={{ mb: 2, color: "text.secondary", fontWeight: 700 }}
            >
              Anteprima Live
            </Typography>
            <PreviewComponent config={config} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
