import { render, screen } from '@testing-library/react';

import { MantineProvider } from '@mantine/core';
import type { Project } from '../types/project.types';
import { ProjectCard } from './ProjectCard';

const mockProject: Project = {
  id: 123,
  title: 'Senior Frontend Developer con React',
  description: 'Descripción de prueba',
  organization: {
    id: 1,
    name: 'Tech Corp',
    logo: 'https://example.com/logo.png',
    industry: { id: 1, name: 'Software' }
  },
  projectLeader: { id: 99, name: 'Juan', lastName: 'Nadie' },
  category: { id: 1, name: 'Development' },
  subcategory: { id: 2, name: 'Frontend' },
  startDate: '2025-01-01',
  publishedAt: '2025-01-01',
  status: 'PUBLISHED',
  totalHours: 100,
  goals: [],
  faqs: [],
  budget: {
    hourFrom: null,
    hourTo: null,
    total: 5000 
  },
  positions: [
    {
      id: 10,
      title: 'Dev',
      referralBonus: 500,
      skills: [
        { id: 1, name: 'React' },
        { id: 2, name: 'TypeScript' }
      ],
      specialties: [] 
    }
  ]
};

const renderCard = (project = mockProject) => {
  return render(
    <MantineProvider>
      <ProjectCard project={project} />
    </MantineProvider>
  );
};

describe('ProjectCard Component', () => {
  
  it('renders project title and organization name', () => {
    renderCard();
    expect(screen.getByText('Senior Frontend Developer con React')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('displays referral bonus badge when present', () => {
    renderCard();
    expect(screen.getByText(/¡Gana 500€ por referir!/i)).toBeInTheDocument();
  });

  it('does NOT display referral bonus if null', () => {
    const projectNoBonus: Project = {
      ...mockProject,
      positions: [
        { 
          ...mockProject.positions[0], 
          referralBonus: null
        }
      ]
    };
    
    renderCard(projectNoBonus);
    expect(screen.queryByText(/por referir/i)).not.toBeInTheDocument();
  });

  it('formats fixed budget correctly with locale', () => {
    renderCard();
 
    expect(screen.getByText(/5.*000/)).toBeInTheDocument();
  });

  it('renders skills tags', () => {
    renderCard();
    
    const reactTags = screen.getAllByText('React');
    expect(reactTags.length).toBeGreaterThan(0);

    const tsTags = screen.getAllByText('TypeScript');
    expect(tsTags.length).toBeGreaterThan(0);
  });

  it('wraps the card in a link to the detail page', () => {
    renderCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/project/123');
  });
});