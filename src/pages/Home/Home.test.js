import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Home from './Home';

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders main heading', () => {
    const heading = screen.getByRole('heading', { name: /find your dream job/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders search form', () => {
    const jobTitleInput = screen.getByRole('combobox', { name: /job title, skills, or company/i });
    const locationInput = screen.getByRole('combobox', { name: /location/i });
    const searchButton = screen.getByRole('button', { name: /search for jobs/i });

    expect(jobTitleInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('renders key features section', () => {
    const featuresSection = screen.getByLabelText(/key features of freelancer platform/i);
    expect(featuresSection).toBeInTheDocument();

    const freelancersCard = screen.getByRole('heading', { name: /for freelancers/i });
    const employersCard = screen.getByRole('heading', { name: /for employers/i });
    const howItWorksCard = screen.getByRole('heading', { name: /how it works/i });

    expect(freelancersCard).toBeInTheDocument();
    expect(employersCard).toBeInTheDocument();
    expect(howItWorksCard).toBeInTheDocument();
  });

  test('renders featured companies section', () => {
    const featuredCompaniesHeading = screen.getByRole('heading', { name: /featured companies/i });
    expect(featuredCompaniesHeading).toBeInTheDocument();

    const companyLogos = screen.getAllByRole('img');
    expect(companyLogos).toHaveLength(4);

    const companyNames = ['TechCorp', 'InnoSoft', 'DataDynamics', 'CloudNine'];
    companyNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('renders top job categories section', () => {
    const topCategoriesHeading = screen.getByRole('heading', { name: /top job categories/i });
    expect(topCategoriesHeading).toBeInTheDocument();

    const categories = [
      'Software Development',
      'Data Science',
      'Digital Marketing',
      'Project Management',
      'UI/UX Design',
      'Customer Service',
      'Sales',
      'Human Resources',
    ];

    categories.forEach(category => {
      const categoryButton = screen.getByRole('button', { name: new RegExp(`view jobs in ${category}`, 'i') });
      expect(categoryButton).toBeInTheDocument();
    });
  });

  test('autocomplete functionality for job title input', async () => {
    const user = userEvent.setup();
    const jobTitleInput = screen.getByRole('combobox', { name: /job title, skills, or company/i });

    await user.type(jobTitleInput, 'Soft');
    
    const autocompleteOption = await screen.findByText('Software Engineer');
    expect(autocompleteOption).toBeInTheDocument();

    await user.click(autocompleteOption);
    expect(jobTitleInput).toHaveValue('Software Engineer');
  });

  test('autocomplete functionality for location input', async () => {
    const user = userEvent.setup();
    const locationInput = screen.getByRole('combobox', { name: /location/i });

    await user.type(locationInput, 'New');
    
    const autocompleteOption = await screen.findByText('New York');
    expect(autocompleteOption).toBeInTheDocument();

    await user.click(autocompleteOption);
    expect(locationInput).toHaveValue('New York');
  });
});