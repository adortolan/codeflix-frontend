import {
  fireEvent,
  renderWithProviders,
  screen,
  within,
} from '../../../utils/test-utils';
import { GenreForm } from './GenreForm';

const Props = {
  genre: {
    id: '1',
    name: 'Action',
    isActive: true,
    deleted_at: null,
    created_at: '2021-09-01T00:00:00.000000Z',
    updated_at: '2021-09-01T00:00:00.000000Z',
    categories: [],
    description: 'Action',
    pivot: {
      genre_id: '1',
      category_id: '1',
    },
  },
  categories: [],
  isDisabled: false,
  isLoading: false,
  handleSubmit: () => {},
  handleChange: () => {},
};

const mockData = {
  data: [
    {
      id: '1',
      name: 'test',
      isActive: true,
      deleted_at: null,
      created_at: '2021-09-01T00:00:00.000000Z',
      updated_at: '2021-09-01T00:00:00.000000Z',
      categories: [
        {
          id: '1233',
          name: 'alore',
          deleted_at: '',
          is_active: true,
          created_at: '',
          updated_at: '',
          description: '',
        },
        {
          id: '1',
          name: 'Selected',
          deleted_at: '',
          is_active: true,
          created_at: '',
          updated_at: '',
          description: '',
        },
      ],

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

describe('GenreForm', () => {
  it('should render correctly', () => {
    renderWithProviders(<GenreForm {...Props} />);
    expect(screen.getByRole('textbox', { name: /name/i }));
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
      'Action',
    );
  });

  it('should be isdisabled true', () => {
    renderWithProviders(<GenreForm {...Props} isDisabled={true} />);
    expect(screen.getByRole('textbox', { name: /name/i })).toBeDisabled();
  });

  it('should be isLoading true', () => {
    renderWithProviders(<GenreForm {...Props} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should be render with data', () => {
    renderWithProviders(<GenreForm {...Props} genre={mockData.data[0]} />);
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('test');
  });
});
