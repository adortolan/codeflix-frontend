import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';
import { CreateCastMember } from './CreateCastMembers';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  rest.post('http://localhost:2000/castmembers', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe('CreateCastMember', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it('should rendler correctly', () => {
    renderWithProviders(<CreateCastMember />);

    expect(screen.getByText('Create Cast Member')).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithProviders(<CreateCastMember />);
    const name = screen.getByTestId('name');
    const submit = screen.getByText('Save');

    fireEvent.change(name, { target: { value: 'Test' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText('CastMember created successfully');
      expect(text).toBeInTheDocument();
    });
  });

  it('should submit with erro', async () => {
    server.use(
      rest.post('http://localhost:2000/castmembers', (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    renderWithProviders(<CreateCastMember />);
    const name = screen.getByTestId('name');
    const submit = screen.getByText('Save');

    fireEvent.change(name, { target: { value: 'Test' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText('CastMember not created');
      expect(text).toBeInTheDocument();
    });
  });
});
