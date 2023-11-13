import CategoryCreate from './CreateCategory';
import {
  fireEvent,
  render,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.post('http://localhost:2000/categories', (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe('CategoryCreate', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it('should render', () => {
    renderWithProviders(<CategoryCreate />);
    expect(screen.getByText('Create Category')).toBeInTheDocument();
  });

  it('should submit new category', async () => {
    renderWithProviders(<CategoryCreate />);

    const name = screen.getByRole('textbox', { name: /name/i });
    const description = screen.getByRole('textbox', { name: /description/i });
    fireEvent.change(name, { target: { value: 'Test' } });
    fireEvent.change(description, { target: { value: 'Test description' } });

    const buttonSave = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(buttonSave);

    await waitFor(() => {
      expect(
        screen.getByText('Category create successfully'),
      ).toBeInTheDocument();
    });
  });

  it('should show error message', async () => {
    server.use(
      rest.post('http://localhost:2000/categories', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<CategoryCreate />);

    const name = screen.getByRole('textbox', { name: /name/i });
    const description = screen.getByRole('textbox', { name: /description/i });
    fireEvent.change(name, { target: { value: 'Test' } });
    fireEvent.change(description, { target: { value: 'Test description' } });

    const buttonSave = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(buttonSave);

    await waitFor(() => {
      expect(screen.getByText('Category not create')).toBeInTheDocument();
    });
  });
});
