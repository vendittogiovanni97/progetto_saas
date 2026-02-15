import { Suspense, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectBuilder } from "@/features/projects/components/ProjectBuilder";

function CreateProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryIdParam = searchParams.get("categoryId");
  const categoryId = categoryIdParam ? Number(categoryIdParam) : null;

  useEffect(() => {
    if (!categoryId) {
      router.push("/dashboard/projects");
    }
  }, [categoryId, router]);

  if (!categoryId) return null;

  return <ProjectBuilder categoryId={categoryId} />;
}

export default function CreateProjectPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>}>
      <CreateProjectContent />
    </Suspense>
  );
}
