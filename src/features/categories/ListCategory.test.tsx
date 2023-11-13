import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockCategory = {
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
  rest.get('http://localhost:2000/categories', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json(mockCategory));
  }),

  rest.delete(
    'http://localhost:2000/categories/0ce68ddd-4981-4ee2-a23b-a01452b96b01',
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    },
  ),
];

const server = setupServer(...handlers);

import CategoryList from './ListCategory';

describe('ListCategory', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it('should render', () => {
    renderWithProviders(<CategoryList />);

    expect(screen.getByText('New Category')).toBeInTheDocument();
  });

  it('should render a list of categories', async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      expect(screen.getAllByText('Olive Novo')).toHaveLength(1);
      expect(screen.getAllByText('Banana Novo')).toHaveLength(1);
      expect(screen.getAllByText('Sapato')).toHaveLength(1);
    });
  });

  it('should be delete category', async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const deleteButton = screen.getAllByTestId('delete-button')[0];
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Category deleted')).toBeInTheDocument();
    });
  });

  it('should error when delete', async () => {
    server.use(
      rest.delete('http://localhost:2000/categories/:id', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const deleteButton = screen.getAllByTestId('delete-button')[0];
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Category not deleted')).toBeInTheDocument();
    });
  });

  it('should error when fetching', async () => {
    server.use(
      rest.get('http://localhost:2000/categories', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching categories')).toBeInTheDocument();
    });
  });
});
