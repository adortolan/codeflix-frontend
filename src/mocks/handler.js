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

const cast_members = {
  data: [
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b01',
      name: 'Maggio',
      type: 1,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b02',
      name: 'Stanton',
      type: 1,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96b03',
      name: 'Ruiz',
      type: 2,
      deleted_at: null,
      created_at: '2022-08-15T10:59:09+0000',
      updated_at: '2022-08-15T10:59:09+0000',
    },
    {
      id: '0ce68ddd-4981-4ee2-a23b-a01452b96bxx',
      name: 'AddCasMembers',
      type: 1,
      deletedAt: null,
      createdAt: '2022-08-15T10:59:09+0000',
      updatedAt: '2022-08-15T10:59:09+0000',
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

const Genres = {
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

const urlCategory = 'http://localhost:2000/categories';
const urlCastMembers = 'http://localhost:2000/castmembers';
const urlGenres = 'http://localhost:2000/genres';

export const handlers = [
  /* LIST ALL */
  rest.get(urlCategory, (req, res, ctx) => {
    return res(ctx.json(categories));
  }),

  /* LIST ONE */
  rest.get(urlCategory + '/:id', (req, res, ctx) => {
    const id = req.params.id;

    const category = categories.data.find((cat) => cat.id === id);

    if (category) {
      return res(ctx.json(category));
    } else {
      return res(ctx.json({ message: 'No category' }));
    }
  }),

  /* CREATE */
  rest.post(urlCategory, async (req, res, ctx) => {
    const category = await req.json();

    category.id = crypto.randomUUID();
    categories.data.push(category);

    return res(
      ctx.status(201),
      ctx.json({
        id: category.id,
        category,
      }),
    );
  }),

  /* UPDATE */
  rest.put(urlCategory + '/edit/:id', async (req, res, ctx) => {
    const id = req.params.id;

    const newCategory = await req.json();

    const category = categories.data.find((cat) => cat.id === id);
    category.name = newCategory.name;
    category.description = newCategory.description;
    category.is_active = newCategory.is_active;

    return res(
      ctx.status(201),
      ctx.json({
        id: category.id,
        category,
      }),
    );
  }),

  /* DELETE */
  rest.delete(urlCategory + '/:id', async (req, res, ctx) => {
    const id = req.params.id;
    const categoryIndex = categories.data.findIndex((cat) => cat.id === id);

    categories.data.splice(categoryIndex, 1);

    return res(
      ctx.json({
        message: 'Delete category sucessfully',
      }),
    );
  }),

  /*  CASTMEMBERS */
  /* LIST ALL */
  rest.get(urlCastMembers, (req, res, ctx) => {
    return res(ctx.json(cast_members));
  }),

  /* LIST ONE */
  rest.get(urlCastMembers + '/:id', (req, res, ctx) => {
    const id = req.params.id;

    const cast = cast_members.data.find((cast) => cast.id === id);

    if (cast) {
      return res(ctx.json(cast));
    } else {
      return res(ctx.json({ message: 'No cast members' }));
    }
  }),

  /* CREATE */
  rest.post(urlCastMembers, async (req, res, ctx) => {
    const cast = await req.json();

    cast_members.data.push(cast);

    return res(
      ctx.status(201),
      ctx.json({
        id: cast.id,
        cast,
      }),
    );
  }),

  /* UPDATE */
  rest.put(urlCastMembers + '/edit/:id', async (req, res, ctx) => {
    const id = req.params.id;

    const newCast = await req.json();

    const cast = cast_members.data.find((cast) => cast.id === id);
    cast.name = newCast.name;
    cast.description = newCast.description;
    cast.is_active = newCast.is_active;

    return res(
      ctx.status(201),
      ctx.json({
        id: newCast.id,
        cast_members,
      }),
    );
  }),

  /* DELETE */
  rest.delete(urlCastMembers + '/:id', async (req, res, ctx) => {
    const id = req.params.id;
    const castIndex = cast_members.data.findIndex((cat) => cat.id === id);

    cast_members.data.splice(castIndex, 1);

    return res(
      ctx.json({
        message: 'Delete cast members sucessfully',
      }),
    );
  }),

  /* GENRES */
  /* List all */
  rest.get(urlGenres, (req, res, ctx) => {
    return res(ctx.json(Genres));
  }),

  /* List one */
  rest.get(urlGenres + '/:id', (req, res, ctx) => {
    const id = req.params.id;
    const genre = Genres.data.find((genre) => genre.id === id);
    if (genre) {
      return res(ctx.json(genre));
    } else {
      return res(ctx.json({ message: 'No genre' }));
    }
  }),

  /* update */
  rest.put(urlGenres + '/edit/:id', async (req, res, ctx) => {
    const id = req.params.id;

    const newGenre = await req.json();

    const genre = Genres.data.find((genre) => genre.id === id);
    genre.name = newGenre.name;
    genre.categories = newGenre.categories;

    return res(
      ctx.status(201),
      ctx.json({
        id: genre.id,
        genre,
      }),
    );
  }),
];
