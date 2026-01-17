import React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

export type UiAvatarProps = AvatarProps;

export function UiAvatar(props: UiAvatarProps) {
  return <Avatar {...props} />;
}
