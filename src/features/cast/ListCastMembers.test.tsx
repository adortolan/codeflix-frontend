import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import ListCastMembers from './ListCastMembers';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockCastMembers = {
  data: [
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b01',
      name: 'Maggio',
      type: 1,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b02',
      name: 'Stanton',
      type: 1,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b03',
      name: 'Ruiz',
      type: 2,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96bxx',
      name: 'AddCasMembers',
      type: 1,
      deletedAt: null,
      createdAt: '2022-08-15T10:59:09+0000',
      updatedAt: '2022-08-15T10:59:09+0000',
    },
  ],
  links: {
    first: 'http://localhost:8000/api/categories?page1',
    last: 'http://localhost:8000/api/categories?page7',
    prev: null,
    next: 'http://localhost:8000/api/categories?page2',
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 15,
    path: 'http://localhost:8000/api/categories',
    per_page: 15,
    to: 15,
    total: 100,
  },
};

export const handlers = [
  rest.get('http://localhost:2000/castmembers', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json(mockCastMembers));
  }),

  rest.delete(
    'http://localhost:2000/castmembers/0ce68ddd-4981-4ee2-a23b-a01452b96b01',
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    },
  ),
];

const server = setupServer(...handlers);

describe('CreateCastMember', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it('should be render', () => {
    renderWithProviders(<ListCastMembers />);
    expect(screen.getByText('New Cast Members')).toBeInTheDocument();
  });

  it('should click delete button', async () => {
    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const buttonDelete = screen.getAllByTestId('delete-button')[0];

      expect(buttonDelete).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId('delete-button')[0]);

    await waitFor(() => {
      expect(screen.getByText('Cast member deleted')).toBeInTheDocument();
    });
  });

  it('should error when delete', async () => {
    server.use(
      rest.delete('http://localhost:2000/castmembers/:id', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );
    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      const buttonDelete = screen.getAllByTestId('delete-button')[0];

      expect(buttonDelete).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId('delete-button')[0]);

    await waitFor(() => {
      expect(screen.getByText('Cast member not deleted')).toBeInTheDocument();
    });
  });

  it('should error', async () => {
    server.use(
      rest.get('http://localhost:2000/castmembers', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<ListCastMembers />);

    await waitFor(() => {
      expect(screen.getByText('Error!')).toBeInTheDocument();
    });
  });
});
