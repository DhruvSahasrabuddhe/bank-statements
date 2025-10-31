import React from 'react';
import { render } from '@testing-library/react-native';
import DefaulterScreen from '../DefaulterScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock route
const mockRoute = {
  params: {
    list: [
      {
        id: 1,
        customerName: 'John Doe',
        amount: 1000.50,
        dueDate: '2024-01-15',
      },
      {
        id: 2,
        customerName: 'Jane Smith',
        amount: 500.25,
        dueDate: '2024-01-10',
      },
    ],
  },
};

describe('DefaulterScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <DefaulterScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('displays no defaulters message when list is empty', () => {
    const emptyRoute = {
      params: {
        list: [],
      },
    };
    
    const { getByText } = render(
      <DefaulterScreen navigation={mockNavigation} route={emptyRoute} />
    );
    
    expect(getByText('No defaulters to show')).toBeTruthy();
  });

  it('displays amount with 2 decimal places', () => {
    const { getByText } = render(
      <DefaulterScreen navigation={mockNavigation} route={mockRoute} />
    );
    
    expect(getByText(/1000\.50/)).toBeTruthy();
    expect(getByText(/500\.25/)).toBeTruthy();
  });
});
