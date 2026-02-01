import { render, screen, fireEvent, act } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { FiltersModal } from './FiltersModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilterOptions } from '../hooks/useFilterOptions';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../hooks/useFilterOptions', () => ({
  useFilterOptions: jest.fn(),
}));

const mockOptions = {
  options: {
    specialties: [{ id: 1, name: 'Frontend' }],
    skills: [{ id: 1, name: 'React' }],
    categories: [{ id: 1, name: 'Fixed' }],
    industries: [{ id: 1, name: 'Tech' }],
  },
  loading: false
};

describe('FiltersModal Component', () => {
  const mockPush = jest.fn();
  const mockOnClose = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({ get: mockGet });
    (useFilterOptions as jest.Mock).mockReturnValue(mockOptions);
    mockGet.mockReturnValue(null);
  });

  const setup = (opened = true) => {
    return render(
      <MantineProvider>
        <FiltersModal opened={opened} onClose={mockOnClose} />
      </MantineProvider>
    );
  };

  it('renders correctly when opened', async () => {
    await act(async () => {
      setup(true);
    });

    expect(screen.getByText('Filtrar Proyectos')).toBeInTheDocument();
  });

  it('navigates with default params on apply', async () => {
    await act(async () => {
      setup(true);
    });

    const filterBtn = screen.getByRole('button', { name: /Filtrar/i });
    
    await act(async () => {
      fireEvent.click(filterBtn);
    });

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('sortBy=newest'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('resets radio group when clearing filters', async () => {
    mockGet.mockImplementation((key) => (key === 'sortBy' ? 'oldest' : null));

    await act(async () => {
      setup(true);
    });

    const clearBtn = screen.getByText('Eliminar Filtros');
    
    await act(async () => {
      fireEvent.click(clearBtn);
    });

    const newestRadio = screen.getByLabelText(/Más reciente primero/i) as HTMLInputElement;
    expect(newestRadio.checked).toBe(true);
  });
});