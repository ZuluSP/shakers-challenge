import { JsonProjectRepository } from './json-project.repository';
import { Project } from '../../domain/models/project.model';

describe('JsonProjectRepository Logic', () => {
  let repository: JsonProjectRepository;

  const mockProjects = [
    {
      id: 1,
      title: 'Website Development',
      description: 'React project',
      category: { id: 1, name: 'Dev' },
      organization: { industry: { id: 10, name: 'Tech' } },
      positions: [{ skills: [{ id: 100, name: 'React' }], specialties: [] }],
      publishedAt: new Date('2025-01-01'),
    },
    {
      id: 2,
      title: 'Data Analysis',
      description: 'Python project',
      category: { id: 2, name: 'Data' },
      organization: { industry: { id: 20, name: 'Finance' } },
      positions: [{ skills: [{ id: 200, name: 'Python' }], specialties: [] }],
      publishedAt: new Date('2024-01-01'),
    },
  ];

  beforeEach(() => {
    repository = new JsonProjectRepository();
    (repository as any).projects = mockProjects;
  });

  it('should return all projects if no filters are provided', async () => {
    const result = await repository.findAll();
    expect(result.length).toBe(2);
  });

  it('should filter by searchTerm (case insensitive)', async () => {
    const result = await repository.findAll({ searchTerm: 'website' });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });

  it('should filter by category', async () => {
    const result = await repository.findAll({ category: [2] });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });

  it('should filter by skills', async () => {
    const result = await repository.findAll({ skills: [100] });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });

  it('should sort by newest', async () => {
    const result = await repository.findAll({ sortBy: 'newest' });
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });

  it('should sort by oldest', async () => {
    const result = await repository.findAll({ sortBy: 'oldest' });
    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
  });
});