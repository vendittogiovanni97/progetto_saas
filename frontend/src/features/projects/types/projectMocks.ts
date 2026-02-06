import { ProjectCard, Service } from "./types";
import { Project } from "@/types/shared.types";

import { ProjectType } from "@/types/shared.types";

// Projects list (used by ProjectsTable / ProjectsListPage)
export const projects: Project[] = [
  {
    id: 1,
    name: "Project Alpha Protocol",
    description: "Main development project",
    type: ProjectType.CHATBOT,
    accountId: 1,
    config: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Project Beta Synthesis",
    description: "Frontend components library",
    type: ProjectType.FORM,
    accountId: 1,
    config: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Project Gamma Ray",
    description: "Backend infrastructure",
    type: ProjectType.API,
    accountId: 1,
    config: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Orbital Calibration",
    description: "Satellite data processing",
    type: ProjectType.WORKFLOW,
    accountId: 1,
    config: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Project detail cards
export const projectCards: ProjectCard[] = [
  {
    id: "domains",
    title: "Domains",
    status: "Active: orbital.io",
    icon: "language",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx_BofiYLRFK04J8SIIWJQAV2orLJ6qM5wTdj-idA6RRyRup_Yy5P3mGAYGOC0PNppy8gKUh6rFcztf5pu-z98mqAAW2ijqoEo39wff_V_DhiuFZCouD-MS-veDG6SCsfLfQkJ6h2mXslNrlMQh6MiSP11KeMRUCv10sZlzKh292eXnKBwiJrl796jp2JUbzebwDMXm5B8_ggJFEvBXiX2Mr8woeucE8QXnSGbrHgxw5AjoodQbejaYuyykOC8hgNgt4odvhmGDgg",
  },
  {
    id: "config",
    title: "Configuration",
    status: "Version v2.1.0",
    icon: "tune",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA0NnrmUAEUOj0GyO-axKVk8w0QKOarwgRTNlfFsO4MCcf26m_BA7na5FiB_pqfG_LPDPBGPMWLqHGwrFBPb7Me6GW6XDBPa9JIu0242o_-Z4Ewu23BYvLna3JPCWxrEuLt7fdCZCSV-X49GT2txGAmQ9mhp4XBgZl3MsjP3CAq539QsOw9MRUwnxOsPodsLceYJqRbn9GvYttMMTLT6NvSh2s4IbKbS6G2xz0HjCvjIL3Zm56G4q4in0KBcPgzxu0UK-BQPXPdrM",
  },
  {
    id: "services",
    title: "Services",
    status: "4/4 Healthy",
    icon: "hub",
    isActive: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj6vYv6NEt8GAv2lZEjvGlfOspvFeAa-mlx6PPDryatj7pryCGmgSaZeF1Vdw-73dIdeCCiqRsC_TLlYLp_8uGgOyjYyTjPbdlEyjVlSC3bLXAo9NdLqTlQZp_5euuqTsAZYbnqPr2kHQaaM49lhQR6wjgp_Q01gghI0-liVsIGKFKr0hFQKFMelJyMcccKV_MJwGfDvVFgAqBcd-pWC0W22_RxRMMA-6eAhLAbK_wMp0zEQVYZWwzkBJ8HR8T-WmiiCngDTaTa2M",
  },
  {
    id: "access",
    title: "Access Control",
    status: "3 Admin, 12 User",
    icon: "admin_panel_settings",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8dh2lKo-z3xyGJdOnzWx51uDMu3DSdMOb70UBULDOF_ZbqJdIHgDlUcy3831DMkw3rMXjyfI4NpaOSHeQxHVqzRD3hlPSLqbaS_PgT70aJplQXdkqxmXM_9OTWRCwk0ZMN85fqWphrTBm9mWMVHBPfrro76Jpmi43_XKbYR-UZyYGhdpZXqF73zSP6vKunUkgLn4Za-w27DI8-nkcKy5LAYTkaawIbxtGf26fX5AtYHKpJ5pXIUaOeiXeeXrROliXHnaxisMIS1Y",
  },
  {
    id: "clients",
    title: "Clients",
    status: "24 Connected",
    icon: "devices",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3Q4MkZBR2w-5SpWUHIXdBhWIQFrJ3vSLygQN1yNSa7d-EaOO62SPREA7P_FS1gRlRPvVzwxIrthgrQxPX3u5sl_Q2VRB88_152nCo0NUuOx25VlVDN9JupW9KtVmbNX-Rq6o3quilJCcoGyeHucGdp61PhKBe1pfNyGibmLjf28egARgAUpu6Td0djPyOV5pqVTB0fDjstkZ7m8P8jSySuYtBCE4VBaADqZ0mXfTKnL1TCjQkoVYqX95QvcoM-OvIeQ_Bum2rGk",
  },
  {
    id: "logs",
    title: "Activity Log",
    status: "ERR: Connection reset",
    icon: "terminal",
    isError: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQsuHdQ5FD40GOo4CcPXV0_Ay5GjKV9dQuCVxdWwshiZVd7YEQVcU_2cND-GQvWxYGdYutWECjZ99c8yK0wyCuz2U7vjMynTyMfZEYdqTtQgxncMcWJ2zSqS-GQvWxYGdYutWECjZ99c8yK0wyCuz2U7vjMynTyMfZEYdqTtQgxncMcWJ2zSqS-GXhoMZrxNR6al-zxtZ5w85xw6a3Vn-Glxx2WC_h2-WqkAuiCsbrd5WTOSRR2LiU0o9n-gxjGD01Xmps5DoSbYpFHOkKVENuA30Wm4tzTcrBEWGjpcou9sLF7nwfK4kqinJGuQxwuSRm_YdgOzzTA",
  },
  {
    id: "deploy",
    title: "Deployments",
    status: "v1.2.4 building...",
    icon: "rocket_launch",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH0Y4pA2G5P7N9F_H6G8S5J9K4L3M2N1O0P9Q8R7S6T5U4V3W2X1Y0Z9A8B7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0T9U8V7W6X5Y4Z3",
  },
];

// Services mock
export const services: Service[] = [
  {
    name: "Database",
    status: "RUNNING",
    cpu: "12%",
    mem: "480MB",
    icon: "memory",
  },
  {
    name: "Redis Cluster",
    status: "RUNNING",
    keys: "12,402",
    hit: "99.2%",
    icon: "storage",
  },
  {
    name: "Worker Nodes",
    status: "IDLE",
    uptime: "4d 2h",
    icon: "engineering",
  },
  {
    name: "API Gateway",
    status: "RUNNING",
    reqs: "450",
    lat: "24ms",
    icon: "api",
  },
];

// Simple mock logs used by ProjectLogViewer
export const mockLogs = [
  { timestamp: "10:42:00", level: "INFO", message: "Starting production build..." },
  { timestamp: "10:42:05", level: "INFO", message: "Fetching repository dependencies..." },
  { timestamp: "10:42:10", level: "WARN", message: "Deprecated API usage detected in 'auth-service'" },
  { timestamp: "10:42:15", level: "ERROR", message: "Failed to connect to redis-primary.cluster.local:6379" },
  { timestamp: "10:42:16", level: "INFO", message: "Retrying connection in 5s... (Attempt 1/3)" },
  { timestamp: "10:42:21", level: "INFO", message: "Retrying connection in 10s... (Attempt 2/3)" },
  { timestamp: "10:42:31", level: "INFO", message: "Connected to redis-primary sucessfully." },
  { timestamp: "10:42:32", level: "DEBUG", message: "Cache pre-warmed with 1,245 keys" },
  { timestamp: "10:42:35", level: "INFO", message: "Server listening on port 3000" },
];

// Template gallery items
export const templates = [
  {
    id: "chatbot",
    title: "Chatbot Ai Assistant",
    description: "Crea un assistente virtuale intelligente per il tuo sito web con integrazione LLM.",
    icon: "smart_toy",
    color: "#3b82f6",
    image: "/chatbot_template.png",
  },
  {
    id: "crm",
    title: "Minimal CRM",
    description: "Gestisci i tuoi contatti e lead in modo semplice ed efficace con una dashboard dedicata.",
    icon: "groups",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "saas-app",
    title: "SaaS Dashboard",
    description: "Uno scheletro completo per la tua prossima applicazione web con login e analytics.",
    icon: "dashboard",
    color: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

// Env vars mock
export const mockEnvVars = [
  { key: "DATABASE_URL", value: "mysql://user:pass@localhost:3306/db", isSecret: true },
  { key: "API_KEY", value: "sk_live_51M...", isSecret: true },
  { key: "NODE_ENV", value: "production", isSecret: false },
];

export default {
  projects,
  projectCards,
  services,
  mockLogs,
  templates,
  mockEnvVars,
};
