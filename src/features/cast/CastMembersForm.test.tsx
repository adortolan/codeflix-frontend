import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CastMembersForm } from './CastMembersForm';

type parametros = {
  isDisabled: boolean;
  isLoading: boolean;
};

const buildComponent = ({ isDisabled, isLoading }: parametros) => {
  const props = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    isDisabled,
    isLoading,
    castMember: {
      id: '1',
      name: 'TEstes',
      type: 1,
      deleted_at: null,
      created_at: '2021-10-01T00:00:00.000000Z',
      updated_at: '2021-10-01T00:00:00.000000Z',
    },
  };

  render(<CastMembersForm {...props} />, { wrapper: BrowserRouter });
};

describe('CastMemberForm', () => {
  it('should render castMember form  correctly', () => {
    buildComponent({ isDisabled: true, isLoading: true });

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('should render with value name correctly', () => {
    const params = {
      isDisabled: false,
      isLoading: false,
    };

    buildComponent({ ...params });

    expect(screen.getByDisplayValue('TEstes')).toBeInTheDocument();
  });

  it('should be button name is disabled', () => {
    const params = {
      isDisabled: true,
      isLoading: false,
    };

    buildComponent({ ...params });

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('should be button name is loading...', () => {
    const params = {
      isDisabled: false,
      isLoading: true,
    };

    buildComponent({ ...params });

    expect(
      screen.getByRole('button', { name: 'Loading...' }),
    ).toBeInTheDocument();
  });
});
