/**
 * Mock data per la pagina Dashboard
 */

import { Stat, Project, ComponentLibraryItem, SystemLog } from "../types/index";

export const stats: Stat[] = [
  { 
    label: "Total Active Projects", 
    value: "12", 
    icon: "account_tree",
    trend: { value: 8, isPositive: true },
    color: "primary" as const
  },
  { 
    label: "Pending Review", 
    value: "04", 
    icon: "assignment_late",
    description: "SYSTEM_SYNC_REQUIRED",
    color: "warning" as const
  },
  { 
    label: "Resource Load", 
    value: "68%", 
    icon: "memory",
    trend: { value: 12, isPositive: false },
    color: "info" as const
  },
  { 
    label: "Critical Errors", 
    value: "0", 
    icon: "verified_user",
    description: "NO_THREATS_DETECTED",
    color: "success" as const
  },
];

export const projects: Project[] = [
  {
    id: "PRJ-004",
    name: "Project Alpha Protocol",
    status: "Active",
    statusColor: "success",
    progress: 80,
    time: "10:42:00",
  },
  {
    id: "PRJ-005",
    name: "Project Beta Synthesis",
    status: "Paused",
    statusColor: "warning",
    progress: 22,
    time: "09:15:33",
  },
  {
    id: "PRJ-006",
    name: "Project Gamma Ray",
    status: "Pending",
    statusColor: "default" as const,
    progress: 0,
    time: "--:--:--",
  },
  {
    id: "PRJ-007",
    name: "Orbital Calibration",
    status: "Active",
    statusColor: "success",
    progress: 45,
    time: "08:00:12",
  },
];

export const componentLibrary: ComponentLibraryItem[] = [
  { icon: "input", title: "Input Controls", desc: "Forms, Toggles, Selects" },
  { icon: "monitoring", title: "Data Viz", desc: "Charts, Graphs, Maps" },
  { icon: "menu", title: "Navigation", desc: "Sidebars, Tabs, Breadcrumbs" },
  { icon: "build", title: "Utilities", desc: "Helpers, Layouts" },
];

export const systemLogs: SystemLog[] = [
  { text: "Project Alpha initiated deployment sequence.", time: "10:42 AM", isPrimary: true },
  { text: "User ADMIN_01 updated settings.", time: "10:30 AM" },
  { text: "Beta Project flagged for review.", time: "09:15 AM", isWarning: true },
];

