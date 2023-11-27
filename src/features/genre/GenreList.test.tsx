import { GenreList } from './GenreList';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockGenres = {
  data: [
    {
      id: '1',
      name: 'Norfolk Island',
      is_active: true,
      deleted_at: null,
      created_at: '2022-10-20T08:28:28+0000',
      updated_at: '2022-10-20T08:28:28+0000',
      categories: [
        {
          id: 'ba994b75-2b8d-4773-abe2-6b43424a2677',
          name: 'PaleTurquoise',
          description: 'Quae quo pariatur ut doloribus consequatur.',
          is_active: true,
          deleted_at: null,
          created_at: '2022-10-20T08:28:21+0000',
          updated_at: '2022-10-20T08:28:21+0000',
          pivot: {
            genre_id: '1',
            category_id: 'ba994b75-2b8d-4773-abe2-6b43424a2677',
          },
        },
      ],
    },
  ],
  links: {
    first: 'http://localhost:8000/api/genres?page=1',
    last: 'http://localhost:8000/api/genres?page=7',
    prev: null,
    next: 'http://localhost:8000/api/genres?page=2',
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: 'http://localhost:8000/api/genres',
    per_page: 15,
    to: 15,
    total: 99,
  },
};

const mockCategory = {
  data: [
    {
      id: 'cbdd550c-ad46-4e50-be8d-a8266aff4162',
      name: 'PaleTurquoise',
      description: 'Explicabo nemo voluptate aut nostrum impedit minus.',
      is_active: true,
      deleted_at: null,
      created_at: '2022-09-27T17:10:33+0000',
      updated_at: '2022-09-27T17:10:33+0000',
    },
    {
      id: 'c9f5b9b9-9b9a-4b9a-8b9a-9b9a9b9a9b9a',
      name: 'PapayaWhip',
      description: 'Quia voluptatem voluptatem.',
      is_active: true,
      deleted_at: null,
      created_at: '2022-09-27T17:10:33+0000',
      updated_at: '2022-09-27T17:10:33+0000',
    },
  ],
  links: {
    first: 'http://localhost:8000/api/categories?page=1',
    last: 'http://localhost:8000/api/categories?page=7',
    prev: null,
    next: 'http://localhost:8000/api/categories?page=2',
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: 'http://localhost:8000/api/categories',
    per_page: 15,
    to: 15,
    total: 95,
  },
};

export const handlers = [
  rest.get('http://localhost:2000/genres', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json(mockGenres));
  }),

  rest.get('http://localhost:2000/categories', (_, res, ctx) => {
    return res(ctx.json(mockCategory), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe('GenreList', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it('should be render correctly', () => {
    renderWithProviders(<GenreList />);

    expect(screen.getByText('New Genre')).toBeInTheDocument();
  });

  it('should be with error', async () => {
    server.use(
      rest.get('http://localhost:2000/genres', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<GenreList />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching genres')).toBeInTheDocument();
    });
  });

  it('should be render with data', async () => {
    renderWithProviders(<GenreList />);

    await waitFor(() => {
      expect(screen.getByText('Norfolk Island')).toBeInTheDocument();
    });
  });

  it('should be message Genre deleted successfully when delete', async () => {
    server.use(
      rest.delete('http://localhost:2000/genres/:id', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(200));
      }),
    );

    renderWithProviders(<GenreList />);

    await waitFor(() => {
      expect(screen.getByText('Norfolk Island')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-button')[0];
    deleteButton.click();

    await waitFor(() => {
      expect(
        screen.getByText('Genre deleted successfully'),
      ).toBeInTheDocument();
    });
  });

  it('should be error when delete', async () => {
    server.use(
      rest.delete('http://localhost:2000/genres/:id', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(501));
      }),
    );

    renderWithProviders(<GenreList />);

    await waitFor(() => {
      expect(screen.getByText('Norfolk Island')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-button')[0];
    deleteButton.click();

    await waitFor(() => {
      expect(screen.getByText('Error deleting genre')).toBeInTheDocument();
    });
  });

  it.only('should handle filter change', async () => {
    renderWithProviders(<GenreList />);

    await waitFor(() => {
      expect(screen.getByText('Norfolk Island')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search…');
    fireEvent.change(input, { target: { value: 'Norfolk Island' } });

    await waitFor(() => {
      const loading = screen.getByRole('progressbar');
      expect(loading).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.change(input, { target: { value: 'Norfolk Island' } });
    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      const loading = screen.getByRole('progressbar');
      expect(loading).toBeInTheDocument();
    });
  });
});
