import { projectsApi } from '@/services/api';
import { ProjectListWithFilters } from '@/features/projects/components/ProjectListWithFilters';
import { Header } from '@/features/projects/components/Header';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home(props: PageProps) {
  
  const searchParams = await props.searchParams;

  const projects = await projectsApi.getAll(searchParams);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      <ProjectListWithFilters projects={projects} />
    </main>
  );
}