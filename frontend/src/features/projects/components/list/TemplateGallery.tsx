"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid, alpha, useTheme, CircularProgress } from "@mui/material";
import { ButtonGeneric } from "@/components/ui/button";
import { DynamicIcon } from "@/components/icons/DynamicIcon";
import { ModalGeneric } from "@/components/ui/modal";
import { getCategories } from "../../services/services";


interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  image?: string; // Not in schema but used for UI, using fallback
}

interface TemplateGalleryProps {
  open: boolean;
  onClose: () => void;
  onSelect: (categoryId: number) => void;
}

export function TemplateGallery({ open, onClose, onSelect }: TemplateGalleryProps) {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getCategories();
          setCategories(data || []);
        } catch (err) {

          setError("Impossibile caricare le categorie");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }
  }, [open]);

  const title = (
    <Box>
      <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 800 }}>
        Cosa vuoi creare oggi?
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Seleziona una categoria per iniziare il tuo nuovo progetto.
      </Typography>
    </Box>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={40} />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {categories.map((category) => {
          const color = category.color || theme.palette.primary.main;
          const icon = category.icon || "category";
          const image = category.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"; // Fallback image

          return (
            <Grid key={category.id} size={{ xs: 12, md: 4 }}>
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
                    borderColor: color,
                    boxShadow: `0 12px 24px ${alpha(color, 0.2)}`,
                    bgcolor: alpha(color, 0.03),
                  },
                }}
                onClick={() => onSelect(category.id)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={image}
                  alt={category.name}
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
                        bgcolor: alpha(color, 0.1),
                        color: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DynamicIcon name={icon} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {category.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {category.description}
                  </Typography>
                  <ButtonGeneric.Secondary
                    fullWidth
                    label="Seleziona"
                    sx={{ 
                      borderColor: alpha(color, 0.3),
                      color: color,
                      "&:hover": {
                        bgcolor: alpha(color, 0.1),
                        borderColor: color,
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <ModalGeneric
      open={open}
      onClose={onClose}
      title={title}
      content={<Box sx={{ p: 4, pt: 0 }}>{renderContent()}</Box>}
      maxWidth="lg"
      fullWidth
    />
  );
}

