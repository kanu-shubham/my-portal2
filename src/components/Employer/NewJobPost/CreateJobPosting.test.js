import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CreateJobPosting from './CreateJobPosting';
import { useCreateJob } from '../../../hooks/data/useCreateJob';

// Mock the useCreateJob hook
jest.mock('../../../hooks/data/useCreateJob');

describe('CreateJobPosting', () => {
  const mockOnJobCreated = jest.fn();
  const mockOnClose = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    useCreateJob.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<CreateJobPosting onJobCreated={mockOnJobCreated} onClose={mockOnClose} />);

    expect(screen.getByText('Post a New Job')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Requirements')).toBeInTheDocument();
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact Info')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Tags')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post job/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const user = userEvent.setup();
    render(<CreateJobPosting onJobCreated={mockOnJobCreated} onClose={mockOnClose} />);

    // Fill out the form
    await user.type(screen.getByLabelText('Job Title'), 'Software Engineer');
    await user.type(screen.getByLabelText('Job Description'), 'We are looking for a skilled software engineer');
    await user.type(screen.getByLabelText('Job Requirements'), '3+ years of experience');
    await user.type(screen.getByLabelText('Company Name'), 'Tech Corp');
    await user.type(screen.getByLabelText('Contact Info'), 'hr@techcorp.com');

    // Add tags
    const tagInput = screen.getByPlaceholderText('Enter tags and press Enter');
    await user.type(tagInput, 'React{enter}');
    await user.type(tagInput, 'JavaScript{enter}');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /post job/i }));

    // Wait for the mockMutate to be called
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          jobTitle: 'Software Engineer',
          jobDescription: 'We are looking for a skilled software engineer',
          jobRequirements: '3+ years of experience',
          companyName: 'Tech Corp',
          contactInfo: 'hr@techcorp.com',
          tags: ['React', 'JavaScript'],
          applicants: 0,
        }),
        expect.anything()
      );
    });
  });

  it('displays error messages for required fields', async () => {
    render(<CreateJobPosting onJobCreated={mockOnJobCreated} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: /post job/i }));

    await waitFor(() => {
      expect(screen.getByText('Job title is required')).toBeInTheDocument();
      expect(screen.getByText('Job description is required')).toBeInTheDocument();
      expect(screen.getByText('Job requirements are required')).toBeInTheDocument();
      expect(screen.getByText('Company name is required')).toBeInTheDocument();
      expect(screen.getByText('Contact info is required')).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', () => {
    render(<CreateJobPosting onJobCreated={mockOnJobCreated} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('resets form and calls onJobCreated after successful submission', async () => {
    const user = userEvent.setup();
    render(<CreateJobPosting onJobCreated={mockOnJobCreated} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText('Job Title'), 'Software Engineer');
    await user.type(screen.getByLabelText('Job Description'), 'Description');
    await user.type(screen.getByLabelText('Job Requirements'), 'Requirements');
    await user.type(screen.getByLabelText('Company Name'), 'Company');
    await user.type(screen.getByLabelText('Contact Info'), 'contact@example.com');

    mockMutate.mockImplementation((_, options) => {
      options.onSuccess({ id: '1', title: 'Software Engineer' });
    });

    await user.click(screen.getByRole('button', { name: /post job/i }));

    await waitFor(() => {
      expect(mockOnJobCreated).toHaveBeenCalledWith({ id: '1', title: 'Software Engineer' });
      expect(screen.getByLabelText('Job Title')).toHaveValue('');
      expect(screen.getByLabelText('Job Description')).toHaveValue('');
      expect(screen.getByLabelText('Job Requirements')).toHaveValue('');
      expect(screen.getByLabelText('Company Name')).toHaveValue('');
      expect(screen.getByLabelText('Contact Info')).toHaveValue('');
    });
  });

  it('handles errors during job creation', async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<CreateJobPosting onJobCreated={mockOnJobCreated} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText('Job Title'), 'Software Engineer');
    await user.type(screen.getByLabelText('Job Description'), 'Description');
    await user.type(screen.getByLabelText('Job Requirements'), 'Requirements');
    await user.type(screen.getByLabelText('Company Name'), 'Company');
    await user.type(screen.getByLabelText('Contact Info'), 'contact@example.com');

    mockMutate.mockImplementation((_, options) => {
      options.onError(new Error('Failed to create job'));
    });

    await user.click(screen.getByRole('button', { name: /post job/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating job:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});