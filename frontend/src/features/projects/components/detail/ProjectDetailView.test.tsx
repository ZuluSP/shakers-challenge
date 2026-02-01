import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ProjectDetailView } from './ProjectDetailView';
import { Project } from '@/features/projects/types/project.types';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockProject: Project = {
  id: 1,
  title: 'Senior Frontend Developer con React',
  description: 'Descripción detallada del proyecto de prueba.',
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
  totalHours: 160,
  goals: ['Objetivo 1', 'Objetivo 2'],
  faqs: [{ question: '¿Es remoto?', answer: 'Sí, 100% remoto.' }],
  budget: {
    hourFrom: null,
    hourTo: null,
    total: 5000 
  },
  positions: [
    {
      id: 10,
      title: 'React Specialist',
      referralBonus: 500,
      skills: [{ id: 1, name: 'React' }, { id: 2, name: 'TypeScript' }],
      specialties: []
    }
  ]
};

const renderView = () => {
  return render(
    <MantineProvider>
      <ProjectDetailView project={mockProject} />
    </MantineProvider>
  );
};

describe('ProjectDetailView Component', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  it('renders project main information', () => {
    renderView();
    
    expect(screen.getAllByText('Senior Frontend Developer con React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('React Specialist').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tech Corp').length).toBeGreaterThan(0);
    
    expect(screen.getByText('160 horas')).toBeInTheDocument();
  });

  it('handles applying and withdrawing from the project', async () => {
    renderView();
    
    const applyBtn = screen.getByRole('button', { name: /aplicar/i });
    fireEvent.click(applyBtn);
    
    const successMsg = await screen.findByText(/aplicación enviada con éxito/i);
    expect(successMsg).toBeInTheDocument();
    
    expect(screen.getByText(/aplicado/i)).toBeInTheDocument();
    
    const withdrawBtn = screen.getByRole('button', { name: /retirar candidatura/i });
    fireEvent.click(withdrawBtn);
    
    expect(screen.queryByText(/aplicado/i)).not.toBeInTheDocument();
  });

  it('toggles accordion items (FAQs)', async () => {
    renderView();
    const faqQuestion = screen.getByText('¿Es remoto?');
    
    fireEvent.click(faqQuestion);
    
    const answer = await screen.findByText('Sí, 100% remoto.');
    expect(answer).toBeInTheDocument();
  });

  it('toggles accordion items (FAQs)', async () => {
    renderView();
    const faqQuestion = screen.getByText('¿Es remoto?');
    
    fireEvent.click(faqQuestion);
    
    const answer = await screen.findByText('Sí, 100% remoto.');
    expect(answer).toBeInTheDocument();
  });

  it('calls router.back() when clicking the back button', () => {
    renderView();
    const backBtn = screen.getByRole('button', { name: /atrás/i });
    fireEvent.click(backBtn);
    expect(mockBack).toHaveBeenCalled();
  });

  it('renders objectives list correctly', () => {
    renderView();
    expect(screen.getByText('Objetivo 1')).toBeInTheDocument();
    expect(screen.getByText('Objetivo 2')).toBeInTheDocument();
  });
});