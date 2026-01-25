/**
 * Mock data per la pagina Dashboard
 */

import { Stat, Project, ComponentLibraryItem, SystemLog } from "../types";

export const stats: Stat[] = [
  { label: "Total Active", value: "12" },
  { label: "Pending Review", value: "04" },
  { label: "Resource Load", value: "68%", isPrimary: true },
  { label: "Errors", value: "0", isSuccess: true },
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
    statusColor: "default",
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

