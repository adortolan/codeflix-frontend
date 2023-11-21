import { mapGenreToForm } from './util';

const mockGenre = {
  id: '1',
  name: 'Genre test',
  isActive: true,
  delete_At: '',
  created_At: '2021-09-01T00:00:00.000000Z',
  updated_At: '2021-09-01T00:00:00.000000Z',
  categories: [
    {
      id: '1',
      name: 'test',
      deleted_at: '',
      is_active: true,
      created_at: '2021-09-01T00:00:00.000000Z',
      updated_at: '2021-09-01T00:00:00.000000Z',
      description: 'test',
    },
  ],
  description: 'test',
  pivot: { genre_id: '1', category_id: '1' },
};

describe('mapGenreToForm', () => {
  it('should return a genre mapped to a form', () => {
    const result = mapGenreToForm(mockGenre);

    expect(result).toEqual({
      id: '1',
      name: 'Genre test',
      categories_id: ['1'],
    });
  });
});
