import React from 'react';
import { Box, Typography, Stack, alpha, Grid, Switch, FormControlLabel } from "@mui/material";
import { InputGeneric } from "../ui/input";
import { SelectGeneric } from "../ui/select";
import { SectionGeneric } from "../ui/section";
import { ButtonGeneric } from "../ui/button";
import { DynamicIcon } from "@/components/icons/DynamicIcon";

export type FieldType = 'text' | 'textarea' | 'select' | 'color_picker' | 'number' | 'switch';

export interface FormOption {
  value: string;
  label: string;
}

export interface FormField {
  attributeName: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FormOption[];
  defaultValue: any;
  rows?: number;
  colSize?: any;
  visible?: (config: Record<string, any>) => boolean;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}

export interface FormSection {
  title: string;
  description?: string;
  icon?: string;
  fields: FormField[];
}

interface FormGenericProps {
  sections: FormSection[];
  config: Record<string, any>;
  onConfigChange: (attributeName: string, value: any) => void;
  onSave?: () => void;
  onCancel?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const FormGeneric: React.FC<FormGenericProps> = ({ 
  sections, 
  config, 
  onConfigChange, 
  onSave,
  onCancel,
  saveLabel = "Salva",
  cancelLabel = "Annulla",
  loading = false,
  disabled = false 
}) => {
  const renderField = (field: FormField) => {
    let fieldContent;

    switch (field.type) {
      case 'color_picker':
        const colors = field.options?.map(opt => opt.value) || [];
        fieldContent = (
          <Box key={field.attributeName}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
              {field.label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {colors.map((color) => (
                <Box
                  key={color}
                  onClick={() => !disabled && onConfigChange(field.attributeName, color)}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    bgcolor: color,
                    cursor: disabled ? "default" : "pointer",
                    border: config[field.attributeName] === color ? "4px solid #fff" : "none",
                    boxShadow: config[field.attributeName] === color ? `0 0 0 2px ${color}` : "none",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { 
                      transform: disabled ? "none" : "scale(1.1)",
                      boxShadow: disabled ? "none" : `0 0 12px ${alpha(color, 0.5)}`
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        );
        break;

      case 'select':
        fieldContent = (
          <SelectGeneric
            key={field.attributeName}
            label={field.label}
            options={field.options || []}
            value={config[field.attributeName] ?? ""}
            onChange={(e) => onConfigChange(field.attributeName, e.target.value)}
            disabled={disabled}
          />
        );
        break;

      case 'textarea':
        fieldContent = (
          <InputGeneric
            key={field.attributeName}
            label={field.label}
            multiline
            rows={field.rows || 2}
            value={config[field.attributeName] ?? ""}
            onChange={(e) => onConfigChange(field.attributeName, e.target.value)}
            placeholder={field.placeholder}
            disabled={disabled}
          />
        );
        break;

      case 'number':
        fieldContent = (
          <InputGeneric
            key={field.attributeName}
            label={field.label}
            type="number"
            value={config[field.attributeName] ?? field.defaultValue ?? ""}
            onChange={(e) => onConfigChange(field.attributeName, Number(e.target.value))}
            placeholder={field.placeholder}
            disabled={disabled}
            inputProps={{ min: field.min, max: field.max, step: field.step }}
          />
        );
        break;

      case 'switch':
        fieldContent = (
          <FormControlLabel
            key={field.attributeName}
            control={
              <Switch
                checked={!!config[field.attributeName]}
                onChange={(e) => onConfigChange(field.attributeName, e.target.checked)}
                disabled={disabled}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{field.label}</Typography>
                {field.helperText && (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>{field.helperText}</Typography>
                )}
              </Box>
            }
            sx={{ ml: 0 }}
          />
        );
        break;

      case 'text':
      default:
        fieldContent = (
          <InputGeneric
            key={field.attributeName}
            label={field.label}
            placeholder={field.placeholder}
            value={config[field.attributeName] ?? ""}
            onChange={(e) => onConfigChange(field.attributeName, e.target.value)}
            disabled={disabled}
          />
        );
        break;
    }

    if (field.visible && !field.visible(config)) {
      return null;
    }

    return (
      <Grid key={field.attributeName} size={field.colSize || 12}>
        {fieldContent}
      </Grid>
    );
  };

  return (
    <Stack spacing={4}>
      {sections.map((section, idx) => (
        <SectionGeneric key={idx} title={section.title} showDivider={false}>
          {section.description && (
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2.5, mt: -1 }}>
              {section.description}
            </Typography>
          )}
          <Grid container spacing={2.5}>
            {section.fields.map(field => renderField(field))}
          </Grid>
        </SectionGeneric>
      ))}

      {(onSave || onCancel) && (
        <Box sx={{ pt: 2, display: "flex", gap: 2 }}>
          {onCancel && (
            <ButtonGeneric.Secondary 
              fullWidth 
              onClick={onCancel} 
              disabled={disabled || loading} 
              label={cancelLabel} 
            />
          )}
          {onSave && (
            <ButtonGeneric.Primary
              fullWidth
              onClick={onSave}
              loading={loading}
              disabled={disabled}
              label={saveLabel}
            />
          )}
        </Box>
      )}
    </Stack>
  );
};
