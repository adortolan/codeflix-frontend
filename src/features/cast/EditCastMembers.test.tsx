import { EditCastMember } from './EditCastMembers';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.put('http://localhost:2000/castmembers/edit/:id', (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe('EditCastMember', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it('should be render', () => {
    renderWithProviders(<EditCastMember />);
    expect(screen.getByText('Edit Cast member')).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithProviders(<EditCastMember />);

    const name = screen.getByTestId('name');

    await waitFor(() => {
      expect(name).toHaveValue('Teste');
    });

    await waitFor(() => {
      const submit = screen.getByText('Save');
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText('Save');
    fireEvent.change(name, { target: { value: 'Test' } });

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText('Cast Member updated successfully');
      expect(text).toBeInTheDocument();
    });
  });

  it('should be submit with error', async () => {
    server.use(
      rest.put('http://localhost:2000/castmembers/edit/:id', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<EditCastMember />);

    const name = screen.getByTestId('name');

    await waitFor(() => {
      expect(name).toHaveValue('Teste');
    });

    await waitFor(() => {
      const submit = screen.getByText('Save');
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText('Save');
    fireEvent.change(name, { target: { value: 'Teste2' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText('Error updating cast member');
      expect(text).toBeInTheDocument();
    });
  });
});
