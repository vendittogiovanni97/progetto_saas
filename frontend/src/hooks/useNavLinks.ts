import { useMemo } from "react";
import { getNavLinksByRole, getActiveNavLinks, type UserRole } from "../common/config/navigazioneSidebar";

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

