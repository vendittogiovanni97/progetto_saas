import React from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';

export type UiAppBarProps = AppBarProps;

export function UiAppBar(props: UiAppBarProps) {
  return <AppBar elevation={0} position="sticky" color="default" {...props} />;
}

export function UiToolbar(props: ToolbarProps) {
  return <Toolbar {...props} />;
}
