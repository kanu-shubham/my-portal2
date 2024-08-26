import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobCard from './JobCard';

jest.mock('@mui/icons-material/LocationOn', () => 'LocationOnIcon');
jest.mock('@mui/icons-material/Work', () => 'WorkIcon');
jest.mock('@mui/icons-material/AttachMoney', () => 'AttachMoneyIcon');

describe('JobCard', () => {
  const mockJob = {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Co',
    location: 'San Francisco, CA',
    experience: 3,
    salary: 120000,
    skills: ['JavaScript', 'React', 'Node.js']
  };

  const mockQuickApply = jest.fn();

  beforeEach(() => {
    render(<JobCard job={mockJob} onQuickApply={mockQuickApply} />);
  });

  test('renders job title', () => {
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('renders company name', () => {
    expect(screen.getByText('Tech Co')).toBeInTheDocument();
  });

  test('renders job location', () => {
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  test('renders required experience', () => {
    expect(screen.getByText('3 years')).toBeInTheDocument();
  });

  test('renders job salary', () => {
    expect(screen.getByText('$120000/year')).toBeInTheDocument();
  });

  test('renders required skills', () => {
    mockJob.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  test('renders Quick Apply button', () => {
    expect(screen.getByRole('button', { name: /Quick apply for Software Engineer at Tech Co/i })).toBeInTheDocument();
  });

  test('renders View Details button', () => {
    expect(screen.getByRole('button', { name: /View details for Software Engineer at Tech Co/i })).toBeInTheDocument();
  });

  test('calls onQuickApply with job id when Quick Appl