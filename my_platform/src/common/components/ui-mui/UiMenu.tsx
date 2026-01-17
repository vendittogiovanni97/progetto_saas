import React from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

export type UiMenuProps = MenuProps;

export function UiMenu(props: UiMenuProps) {
  return <Menu {...props} />;
}

export function UiMenuItem(props: MenuItemProps) {
  return <MenuItem {...props} />;
}
