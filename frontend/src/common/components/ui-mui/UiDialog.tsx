import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export type UiDialogProps = DialogProps;

export function UiDialog(props: UiDialogProps) {
  return <Dialog {...props} />;
}

export const UiDialogTitle = DialogTitle;
export const UiDialogContent = DialogContent;
export const UiDialogActions = DialogActions;
