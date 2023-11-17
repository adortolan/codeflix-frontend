import CategoryEdit from './EditCategory';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.put('http://localhost:2000/categories/edit/:id', (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe('CategoryEdit', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it('should be render', () => {
    renderWithProviders(<CategoryEdit />);
    expect(screen.getByText('Edit Category'));
  });

  it('should be submit', async () => {
    renderWithProviders(<CategoryEdit />);

    const name = screen.getByRole('textbox', { name: /name/i });
    const description = screen.getByRole('textbox', { name: /description/i });

    fireEvent.change(name, { target: { value: 'teste' } });
    fireEvent.change(description, { target: { value: 'Description value' } });

    const submit = screen.getByText('Save');
    fireEvent.change(name, { target: { value: 'Test' } });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(
        screen.getByText('Category updated successfully'),
      ).toBeInTheDocument();
    });
  });

  it('should be submit with error', async () => {
    server.use(
      rest.put('http://localhost:2000/categories/edit/:id', (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<CategoryEdit />);

    const name = screen.getByRole('textbox', { name: /name/i });
    const description = screen.getByRole('textbox', { name: /description/i });

    fireEvent.change(name, { target: { value: 'teste' } });
    fireEvent.change(description, { target: { value: 'Description value' } });

    const submit = screen.getByText('Save');
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText('Category not updated')).toBeInTheDocument();
    });
  });
});
