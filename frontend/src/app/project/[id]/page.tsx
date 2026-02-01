import { ProjectDetailView } from '@/features/projects/components/detail/ProjectDetailView';
import { Header } from '@/features/projects/components/Header';
import { projectsApi } from '@/services/api';


interface PageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  

  let project = null;
  try {
    project = await projectsApi.getById(id);
  } catch (error) {
    console.error('Project not found', error);
  }

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header />
      <ProjectDetailView project={project} />
    </main>
  );
}