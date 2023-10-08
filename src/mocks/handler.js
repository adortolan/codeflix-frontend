import { rest } from 'msw';

const categories = {
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

export const handlers = [
  rest.get('http://localhost:2000/categories', (req, res, ctx) => {
    return res(ctx.json(categories));
  }),

  rest.get('http://localhost:2000/categories/:id', (req, res, ctx) => {
    const id = req.params.id;

    const category = categories.data.find((cat) => cat.id === id);

    if (category) {
      return res(ctx.json(category));
    } else {
      return res(ctx.json({ message: 'No category' }));
    }
  }),
];
