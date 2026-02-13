"use client";

import { Box, Typography, Paper, alpha, CircularProgress, Stack } from "@mui/material";
import { PageHeaderGeneric } from "@/components/layout/page-header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { projectService } from "./services/services";
import { ProjectWithRelations } from "./interfaces/Project.entity";
import { ChatbotPreview } from "./components/chatbot/ChatbotPreview";
import { ButtonGeneric } from "@/components/ui/button";

interface ProjectPageProps {
  projectId: string;
}

export function ProjectDetailPage({ projectId }: ProjectPageProps) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await projectService.getProject(Number(projectId));
        if (response.data) {
          setProject(response.data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <Box sx={{ p: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5">Project not found</Typography>
        <ButtonGeneric.Secondary label="Back to Projects" onClick={() => router.push("/dashboard/projects")} sx={{ mt: 2 }} />
      </Box>
    );
  }

  const structure = project.getParsedStructure();

  return (
    <Box>
      <PageHeaderGeneric
        title="Project Dashboard"
        subtitle={project.name}
        actions={
          <ButtonGeneric.Secondary 
            label="Back to List" 
            onClick={() => router.push("/dashboard/projects")} 
          />
        }
      />

      <Box sx={{ p: 4, display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 6 }}>
        <Stack spacing={4} sx={{ maxWidth: 400, width: "100%" }}>
          <Paper 
            sx={{ 
              p: 4, 
              border: `1px solid ${alpha('#fff', 0.1)}`, 
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
            }}
          >
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 900, letterSpacing: 2 }}>
              SYSTEM_INFO
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>{project.name}</Typography>
            
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">IDENTIFIER</Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace", letterSpacing: 1 }}>{project.id}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">STATUS</Typography>
                <Typography variant="body2">{project.status}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">CREATED_AT</Typography>
                <Typography variant="body2">{new Date(project.createdAt).toLocaleString()}</Typography>
              </Box>
            </Stack>

            <ButtonGeneric.Primary 
              label="Edit Configuration" 
              fullWidth 
              sx={{ mt: 4 }} 
              disabled // TODO: Implement edit
            />
          </Paper>
        </Stack>

        {project.categoryId === 1 && structure && (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <ChatbotPreview config={structure} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

