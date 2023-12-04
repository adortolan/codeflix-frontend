import { GenreCreate } from './GenreCreate';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

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
  rest.post('http://localhost:2000/genres', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),

  rest.get('http://localhost:2000/categories', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json(mockCategories));
  }),
];

const server = setupServer(...handlers);

describe('GenreCreate', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it('should render correctly', () => {
    renderWithProviders(<GenreCreate />);

    expect(screen.getByText('Create Genre')).toBeInTheDocument();
  });

  it('should be click submit', async () => {
    renderWithProviders(<GenreCreate />);
    const name = screen.getByRole('textbox', { name: /name/i });

    fireEvent.change(name, { target: { value: 'Test' } });
    expect(name).toHaveValue('Test');

    await waitFor(() => {
      const buttonSubmit = screen.getByRole('button', { name: 'Save' });
      fireEvent.click(buttonSubmit);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Genre created successfully'),
      ).toBeInTheDocument();
    });
  });

  it('genre created message error', async () => {
    server.use(
      rest.post('http://localhost:2000/genres', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<GenreCreate />);
    const name = screen.getByRole('textbox', { name: /name/i });

    fireEvent.change(name, { target: { value: 'Test' } });

    await waitFor(() => {
      const buttonSubmit = screen.getByRole('button', { name: 'Save' });
      fireEvent.click(buttonSubmit);
    });

    await waitFor(() => {
      expect(screen.getByText('Error creating genre')).toBeInTheDocument();
    });
  });
});
