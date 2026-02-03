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
];

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
