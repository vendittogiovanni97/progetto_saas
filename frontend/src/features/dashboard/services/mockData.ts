
import { Stat, ComponentLibraryItem, SystemLog } from "../types/index";

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
]

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

