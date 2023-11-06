import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';
import { CreateCastMember } from './CreateCastMembers';
import { screen } from '@testing-library/react';

describe('CreateCastMember', () => {
  it('should rendler correctly', () => {
    renderWithProviders(<CreateCastMember />);

    expect(screen.getByText('Create Cast Member')).toBeInTheDocument();
  });
});
