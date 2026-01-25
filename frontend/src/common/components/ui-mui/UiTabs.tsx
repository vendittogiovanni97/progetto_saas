import React from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';

export type UiTabsProps = TabsProps;
export type UiTabProps = TabProps;

export function UiTabs(props: UiTabsProps) {
  return <Tabs {...props} />;
}

export function UiTab(props: UiTabProps) {
  return <Tab {...props} />;
}
