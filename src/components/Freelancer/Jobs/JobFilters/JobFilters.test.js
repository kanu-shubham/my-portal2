import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobFilters from './JobFilters';

describe('JobFilters', () => {
  const mockSetFilters = jest.fn();
  const initialFilters = { skills: ['JavaScript'], minSalary: 50000, location: 'New York' };

  beforeEach(() => {
    render(<JobFilters filters={initialFilters} setFilters={mockSetFilters} />);
  });

  test('renders the component title', () => {
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('renders all filter sections', () => {
    expect(screen.getByLabelText('Skills')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum Salary (per year)')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
  });

  test('displays initial filter values', () => {
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50000');
    expect(screen.getByRole('combobox', { name: /location/i })).toHaveValue('New York');
  });

  test('updates skills filter when a new skill is added', async () => {
    const skillsInput = screen.getByPlaceholderText('Select skills');
    await userEvent.type(skillsInput, 'React{enter}');
    
    expect(mockSetFilters).toHaveBeenCalledWith(expect.objectContaining({
      skills: ['JavaScript', 'React']
    }));
  });

  test('updates minimum salary when slider is moved', () => {
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 75000 } });

    expect(mockSetFilters).toHaveBeenCalledWith(expect.objectContaining({
      minSalary: 75000
    }));
  });

  test('updates location when a new location is selected', async () => {
    const locationInput = screen.getByPlaceholderText('Select location');
    await userEvent.clear(locationInput);
    await userEvent.type(locationInput, 'San Francisco{enter}');

    expect(mockSetFilters).toHaveBeenCalledWith(expect.objectContaining({
      location: 'San Francisco'
    }));
  });

  test('clears all filters when clear button is clicked', () => {
    const clearButton = screen.getByRole('button', { name: 'Clear all filters' });
    fireEvent.click(clearButton);

    expect(mockSetFilters).toHaveBeenCalledWith({
      skills: [],
      minSalary: 0,
      location: null
    });
  });
});