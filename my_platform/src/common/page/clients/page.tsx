"use client";

import { Box } from "@mui/material";
import { useClientsPage } from "./hooks/useClientsPage";
import { ClientsHeader } from "./components/ClientsHeader";
import { ClientsTable } from "./components/ClientsTable";
import { ClientDialog } from "./components/ClientDialog";
import { clients } from "./services/mockData";
import { filterClients } from "./services/filterClients";
import { ClientFormData } from "./types";

export function ClientsPage() {
  const {
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
  } = useClientsPage();

  const filteredClients = filterClients(clients, filters);

  const handleSaveClient = (data: ClientFormData) => {
    // TODO: Integrare con API
    console.log("Save client:", data);
    if (selectedClient) {
      console.log("Update existing client:", selectedClient.id);
    } else {
      console.log("Create new client");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <ClientsHeader
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        planFilter={planFilter}
        onPlanFilterChange={setPlanFilter}
        onCreateClient={handleCreateClient}
      />

      <ClientsTable clients={filteredClients} onEditClient={handleEditClient} />

      <ClientDialog
        open={isDialogOpen}
        client={selectedClient}
        onClose={handleCloseDialog}
        onSave={handleSaveClient}
      />
    </Box>
  );
}

