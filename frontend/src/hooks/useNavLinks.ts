import { UserRole, getNavLinksByRole, getActiveNavLinks } from "@/lib/constants/navigation";
import { useMemo } from "react";

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

