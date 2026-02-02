/**
 * Utility per filtrare i clients
 */

import { Client, ClientsFilter } from "../types/types";

export function filterClients(clients: Client[], filters: ClientsFilter): Client[] {
  return clients.filter((client) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.company?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && client.status !== filters.status) {
      return false;
    }

    // Plan filter
    if (filters.plan && client.plan !== filters.plan) {
      return false;
    }

    return true;
  });
}

