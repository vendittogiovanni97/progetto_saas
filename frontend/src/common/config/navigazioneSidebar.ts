/**
 * Configurazione Navigation Links
 * Struttura enterprise-ready per future integrazioni DB
 */

export type UserRole = "admin" | "editor" | "viewer" | "guest";

export interface NavSubItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  priority: number;
  active: boolean;
  roles: UserRole[];
}

export interface NavLink {
  id: string;
  name: string;
  href: string;
  icon: string;
  priority: number;
  active: boolean;
  roles: UserRole[];
  subItems?: NavSubItem[];
}

/**
 * Configurazione completa dei navigation links
 * In futuro questa configurazione potrà essere caricata dal DB
 */
export const navLinksConfig: NavLink[] = [
  {
    id: "login",
    name: "Login",
    href: "/auth/login",
    icon: "login",
    priority: 0,
    active: true,
    roles: ["admin", "editor", "viewer", "guest"],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    priority: 1,
    active: true,
    roles: ["admin", "editor", "viewer"],
  },
  {
    id: "projects",
    name: "Projects",
    href: "/dashboard/projects",
    icon: "folder_open",
    priority: 2,
    active: true,
    roles: ["admin", "editor", "viewer"],
  },
  { 
    id: "clients",
    name: "Clients",
    href: "/dashboard/clients",
    icon: "people",
    priority: 3,
    active: true,
    roles: ["admin", "editor", "viewer"],
  },
  {
    id: "library",
    name: "Library", 
    href: "/dashboard/library", 
    icon: "extension",
    priority: 4,
    active: true,
    roles: ["admin", "editor"],
    subItems: [
      {
        id: "showcase",
        name: "Showcase",
        href: "/dashboard/showcase",
        icon: "widgets",
        priority: 1,
        active: true,
        roles: ["admin", "editor", "viewer"],
      },
      {
        id: "showcase-mui",
        name: "Showcase MUI",
        href: "/dashboard/showcase-mui",
        icon: "layers",
        priority: 2,
        active: true,
        roles: ["admin", "editor", "viewer"],
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: "bar_chart",
    priority: 5,
    active: true,
    roles: ["admin", "editor"],
  },
  {
    id: "chatbots",
    name: "AI Chatbots",
    href: "/dashboard/chatbots",
    icon: "smart_toy",
    priority: 6,
    active: true,
    roles: ["admin", "editor", "viewer"],
  },
];

/**
 * Utility functions per gestire la configurazione
 */

/**
 * Filtra i navLinks in base ai ruoli utente e stato active
 */
export function getNavLinksByRole(userRole: UserRole): NavLink[] {
  return navLinksConfig
    .filter((link) => link.active && link.roles.includes(userRole))
    .map((link) => ({
      ...link,
      subItems: link.subItems
        ?.filter(
          (subItem) => subItem.active && subItem.roles.includes(userRole)
        )
        .sort((a, b) => a.priority - b.priority),
    }))
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Ottiene tutti i navLinks attivi (senza filtri ruoli)
 */
export function getActiveNavLinks(): NavLink[] {
  return navLinksConfig
    .filter((link) => link.active)
    .map((link) => ({
      ...link,
      subItems: link.subItems
        ?.filter((subItem) => subItem.active)
        .sort((a, b) => a.priority - b.priority),
    }))
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Export compatibilità retroattiva
 * Mantiene la struttura semplice per il componente IndustrialSidebar
 */
export const navLinks = getActiveNavLinks().map((link) => ({
  name: link.name,
  href: link.href,
  icon: link.icon,
  subItems: link.subItems?.map((subItem) => ({
    name: subItem.name,
    href: subItem.href,
    icon: subItem.icon,
  })),
}));
