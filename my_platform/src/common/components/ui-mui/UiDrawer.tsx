import React from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';

export type UiDrawerProps = DrawerProps;

export function UiDrawer(props: UiDrawerProps) {
  return <Drawer {...props} />;
}
