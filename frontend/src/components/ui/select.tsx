"use client";

import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export interface SelectOption {
  value: string | number;
  label: string;
}

export type SelectGenericProps = SelectProps & {
  label?: string;
  helperText?: string;
  options: SelectOption[];
  fullWidth?: boolean;
};

/**
 * SelectGeneric - Wrapper basilare di Select MUI.
 */
export function SelectGeneric({
  label,
  helperText,
  options,
  fullWidth = true,
  error,
  size = "small",
  ...props
}: SelectGenericProps) {
  const labelId = props.id ? `${props.id}-label` : undefined;

  return (
    <FormControl fullWidth={fullWidth} error={error} size={size}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select labelId={labelId} label={label} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
