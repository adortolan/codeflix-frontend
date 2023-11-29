import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { GenreEdit } from './GenreEdit';

const mockGenre = {
  id: '1',
  name: 'test',
  isActive: true,
  deleted_at: null,
  created_at: '2021-09-01T00:00:00.000000Z',
  updated_at: '2021-09-01T00:00:00.000000Z',
  categories: [],
  description: 'test',
  pivot: {
    genre_id: '1',
    category_id: '1',
  },
};

/* const mockGenre = {
  data: [
    {
      id: '1',
      name: 'test',
      isActive: true,
      deleted_at: null,
      created_at: '2021-09-01T00:00:00.000000Z',
      updated_at: '2021-09-01T00:00:00.000000Z',
      categories: [],
      description: 'test',
      pivot: {
        genre_id: '1',
        category_id: '1',
      },
    },
  ],
  links: {
    first: 'http://localhost:8000/api/genres?page=1',
    last: 'http://localhost:8000/api/genres?page=1',
    prev: '',
    next: '',
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: 'http://localhost:8000/api/genres',
    per_page: 15,
    to: 1,
    total: 1,
  },
}; */

const mockCategories = {
  data: [
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b01',
      name: 'Olive Novo',
      description: 'Teste de categoria',
      is_active: true,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b02',
      name: 'Banana Novo',
      description: 'Teste de categoria',
      is_active: true,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b03',
      name: 'Sapato',
      description: 'Teste de categoria',
      is_active: true,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
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

const handlers = [
  rest.get('http://localhost:2000/genres/:id', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json(mockGenre));
  }),

  rest.get('http://localhost:2000/categories', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json(mockCategories));
  }),

  rest.put('http://localhost:2000/genres/edit/:id', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201), ctx.json(mockGenre));
  }),
];

const server = setupServer(...handlers);

describe('GenreEdit', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it('should be render form', () => {
    renderWithProviders(<GenreEdit />);
    expect(screen.getByText('Edit Genre')).toBeInTheDocument();
  });

  it('should be click submit', async () => {
    renderWithProviders(<GenreEdit />);

    await waitFor(() => {
      /* expect(screen.getByTestId('name')).toHaveValue('test'); */
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('test');
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      screen.getByText('Genre updated successfully');
    });
  });

  it('should be click submit with error', async () => {
    server.use(
      rest.put('http://localhost:2000/genres/edit/:id', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(501));
      }),
    );

    renderWithProviders(<GenreEdit />);

    await waitFor(() => {
      /* expect(screen.getByTestId('name')).toHaveValue('test'); */
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('test');
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      screen.getByText('Error updating genre');
    });
  });
});
