"use client";

import { FormConfigurator } from "@/features/projects/components/FormConfigurator";
import { useParams } from "next/navigation";

export default function ProjectPageRoute() {
  const { id } = useParams();
  const projectId = id ? Number(Array.isArray(id) ? id[0] : id) : null;

  return <FormConfigurator projectId={projectId} isReadOnly={true} showHeader={true} padding={0} />;
}
