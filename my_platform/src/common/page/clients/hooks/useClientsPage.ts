/**
 * Hook custom per gestire lo stato della pagina Clients
 */

import { useState, useMemo } from "react";
import { Client, ClientsFilter } from "../types";

export function useClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Client["status"] | "all">(
    "all"
  );
  const [planFilter, setPlanFilter] = useState<Client["plan"] | "all">("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filters: ClientsFilter = useMemo(() => {
    const result: ClientsFilter = {};
    if (search) result.search = search;
    if (statusFilter !== "all") result.status = statusFilter;
    if (planFilter !== "all") result.plan = planFilter;
    return result;
  }, [search, statusFilter, planFilter]);

  const handleCreateClient = () => {
    setSelectedClient(null);
    setIsDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedClient(null);
  };

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    planFilter,
    setPlanFilter,
    filters,
    selectedClient,
    isDialogOpen,
    handleCreateClient,
    handleEditClient,
    handleCloseDialog,
  };
}
