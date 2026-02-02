"use client";

import { ProjectPage } from "@/features/projects/ProjectDetailPage";
import { useParams } from "next/navigation";

export default function ProjectPageRoute() {
  const { id } = useParams();
  const projectId = Array.isArray(id) ? id[0] : id || "";

  return <ProjectPage projectId={projectId} />;
}
