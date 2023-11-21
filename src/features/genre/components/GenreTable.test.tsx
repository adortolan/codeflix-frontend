import {
  fireEvent,
  renderWithProviders,
  screen,
} from '../../../utils/test-utils';
import { GenreTable } from './GenreTable';

const mockData = {
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
};

const mockHandleDelete = jest.fn();

const Props = {
  data: mockData,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 25, 50],
  handleOnPageChange: () => {},
  handleFilterChange: () => {},
  handleOnPageSizeChange: () => {},
  handleDelete: mockHandleDelete,
};

describe('GenreTable', () => {
  it('should be render', () => {
    renderWithProviders(<GenreTable {...Props} />);

    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  it('should be click delete', async () => {
    renderWithProviders(<GenreTable {...Props} />);

    const deleteButton = screen.getByTestId('delete-button');

    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalled();
  });

  it('should be render without meta', () => {
    const mockData = {
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
      },
    };

    const Props = {
      data: mockData,
      perPage: 10,
      isFetching: false,
      rowsPerPage: [10, 25, 50],
      handleOnPageChange: () => {},
      handleFilterChange: () => {},
      handleOnPageSizeChange: () => {},
      handleDelete: mockHandleDelete,
    };

    renderWithProviders(<GenreTable {...Props} />);

    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  it('should be render without data', () => {
    const mockData = {
      data: [],
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
    };

    const Props = {
      data: mockData,
      perPage: 10,
      isFetching: false,
      rowsPerPage: [10, 25, 50],
      handleOnPageChange: () => {},
      handleFilterChange: () => {},
      handleOnPageSizeChange: () => {},
      handleDelete: mockHandleDelete,
    };

    renderWithProviders(<GenreTable {...Props} />);

    expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
  });
});
