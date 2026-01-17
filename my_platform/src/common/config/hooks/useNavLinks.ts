/**
 * Hook per gestire i navigation links con filtri per ruoli
 */

import { useMemo } from "react";
import { getNavLinksByRole, getActiveNavLinks, type NavLink, type UserRole } from "../navigazioneSidebar";

interface UseNavLinksOptions {
  userRole?: UserRole;
  filterByRole?: boolean;
}

export function useNavLinks(options: UseNavLinksOptions = {}) {
  const { userRole, filterByRole = false } = options;

  const navLinks = useMemo(() => {
    if (filterByRole && userRole) {
      return getNavLinksByRole(userRole);
    }
    return getActiveNavLinks();
  }, [userRole, filterByRole]);

  return { navLinks };
}

