"use client";

import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, alpha, useTheme } from "@mui/material";
import { templates } from "@/common/page/projects/types/projectMocks";
import { ModalGeneric } from "@/common/components/modal/ModalGeneric";

// templates are imported from centralized mocks

interface TemplateGalleryProps {
  open: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export function TemplateGallery({ open, onClose, onSelect }: TemplateGalleryProps) {
  const theme = useTheme();

  const title = (
    <Box>
      <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 800 }}>
        Scegli un Template
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Parti da una configurazione base e personalizzala in pochi secondi.
      </Typography>
    </Box>
  );

  const content = (
    <Box sx={{ p: 4, pt: 0 }}>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid key={template.id} size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                bgcolor: alpha(theme.palette.common.white, 0.02),
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: template.color,
                  boxShadow: `0 12px 24px ${alpha(template.color, 0.2)}`,
                  bgcolor: alpha(template.color, 0.03),
                },
              }}
              onClick={() => onSelect(template.id)}
            >
              <CardMedia
                component="img"
                height="160"
                image={template.image}
                alt={template.title}
                sx={{ filter: "grayscale(20%) brightness(80%)" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1.5, 
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: alpha(template.color, 0.1),
                      color: template.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="material-symbols-outlined">{template.icon}</span>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {template.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {template.description}
                </Typography>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ 
                    borderColor: alpha(template.color, 0.3),
                    color: template.color,
                    "&:hover": {
                      bgcolor: alpha(template.color, 0.1),
                      borderColor: template.color,
                    }
                  }}
                >
                  Usa Template
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <ModalGeneric
      open={open}
      onClose={onClose}
      title={title}
      content={content}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          borderRadius: 4,
          boxShadow: theme.shadows[24],
        }
      }}
    />
  );
}
