import React from "react";
import * as Icons from "./icons";

/**
 * Mappa le stringhe provenienti dal DB o config alle icone centralizzate.
 */
const ICON_MAP: Record<string, React.ElementType> = {
  login: Icons.IconLogin,
  dashboard: Icons.IconDashboard,
  folder_open: Icons.IconProjects,
  people: Icons.IconClients,
  extension: Icons.IconLibrary,
  widgets: Icons.IconWidgets,
  layers: Icons.IconLayers,
  bar_chart: Icons.IconAnalytics,
  smart_toy: Icons.IconBot,
  // Fallbacks e mapping per compatibilità con icone del builder o servizi
  dns: Icons.IconDatabase,
  memory: Icons.IconMemory,
  computer: Icons.IconCPU,
  keyboard: Icons.IconKeyboard,
  speed: Icons.IconSpeed,
  timer: Icons.IconUptime,
  settings: Icons.IconSettings,
  delete: Icons.IconDelete,
  add: Icons.IconAdd,
  info: Icons.IconInfo,
  trending_up: Icons.IconTrendUp,
  trending_down: Icons.IconTrendDown,
};

interface DynamicIconProps {
  name: string;
  sx?: any;
}

/**
 * Componente per renderizzare un'icona basata sul nome stringa.
 * Utilizzato principalmente dove i dati arrivano da configurazioni esterne.
 */
export function DynamicIcon({ name, sx }: DynamicIconProps) {
  const IconComponent = ICON_MAP[name] || Icons.IconInfo;
  return <IconComponent sx={sx} />;
}
