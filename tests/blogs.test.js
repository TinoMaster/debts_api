const mongoose = require('mongoose')
const BlogsModel = require('../models/blog.model')
/* Helpers */
const {
  server,
  initialBlogs,
  createOneBlog,
  deleteBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog
} = require('./helpers/blogs')

beforeAll(async () => {
  await BlogsModel.deleteMany({})
  for (const blog of initialBlogs) {
    await BlogsModel.create(blog)
  }
})

describe('Get Blogs', () => {
  let allBlogs = []
  beforeAll(async () => {
    allBlogs = await getAllBlogs()
  })

  test('Get all blogs', async () => {
    expect(allBlogs.body.data.length).toBe(initialBlogs.length)
  })

  test('Get one blog', async () => {
    const blog = await getOneBlog(allBlogs.body.data[0]._id)
    expect(blog.body.data.title).toBe('10 Maneras de Encontrar trabajo remoto')
  })
})

describe('Create Blogs', () => {
  const newBlog = {
    title: 'Cómo ser rico sin trabajar',
    description: 'Si aun no encuentra un trabajo este blog es para ti',
    category: 'javascript',
    content:
      'Vea qué publicaciones tienen más éxito con los análisis integrados de Blogger. Podrás saber de dónde viene tu audiencia y cuáles son sus intereses. Incluso puedes conectar tu blog directamente a Google Analytics para examinarlo más profundamente.',
    image:
      'https://img.freepik.com/vector-premium/plantillas-banner-morado-disenadas-web-varios-titulares-plantilla-fondo-patron-banner-diseno-grafico-abstracto-vector_181182-18343.jpg',
    section: [
      {
        id: 1,
        title: 'Probando',
        type: 'text',
        content:
          'Recibe un pago por tu trabajo. Google AdSense puede mostrar automáticamente anuncios relevantes y dirigidos en su blog, y usted puede convertir la publicación de lo que ama en ingresos.'
      },
      {
        id: 2,
        title: 'Probando',
        type: 'text',
        content:
          'Recibe un pago por tu trabajo. Google AdSense puede mostrar automáticamente anuncios relevantes y dirigidos en su blog, y usted puede convertir la publicación de lo que ama en ingresos.'
      },
      {
        id: 3,
        title: 'Probando',
        type: 'text',
        content:
          'Recibe un pago por tu trabajo. Google AdSense puede mostrar automáticamente anuncios relevantes y dirigidos en su blog, y usted puede convertir la publicación de lo que ama en ingresos.'
      }
    ]
  }
  test('Creating a new blog', async () => {
    const response = await createOneBlog(newBlog)
    expect(response.body.data.title).toBe(newBlog.title)
  })
})

describe('Update Blogs', () => {
  let allBlogs = []
  beforeAll(async () => {
    allBlogs = await getAllBlogs()
  })
  const newBlog = {
    title: 'Cómo ser rico sin trabajar',
    description: 'Si aun no encuentra un trabajo este blog es para ti',
    category: 'javascript',
    content:
      'Vea qué publicaciones tienen más éxito con los análisis integrados de Blogger. Podrás saber de dónde viene tu audiencia y cuáles son sus intereses. Incluso puedes conectar tu blog directamente a Google Analytics para examinarlo más profundamente.',
    image:
      'https://img.freepik.com/vector-premium/plantillas-banner-morado-disenadas-web-varios-titulares-plantilla-fondo-patron-banner-diseno-grafico-abstracto-vector_181182-18343.jpg',
    section: [
      {
        id: 1,
        title: 'Probando',
        type: 'text',
        content:
          'Recibe un pago por tu trabajo. Google AdSense puede mostrar automáticamente anuncios relevantes y dirigidos en su blog, y usted puede convertir la publicación de lo que ama en ingresos.'
      },
      {
        id: 2,
        title: 'Probando',
        type: 'text',
        content:
          'Recibe un pago por tu trabajo. Google AdSense puede mostrar automáticamente anuncios relevantes y dirigidos en su blog, y usted puede convertir la publicación de lo que ama en ingresos.'
      },
      {
        id: 3,
        title: 'Probando',
        type: 'text',
        content:
          'Recibe un pago por tu trabajo. Google AdSense puede mostrar automáticamente anuncios relevantes y dirigidos en su blog, y usted puede convertir la publicación de lo que ama en ingresos.'
      }
    ]
  }
  test('Updating a blog', async () => {
    const response = await updateBlog(allBlogs.body.data[0]._id, newBlog)
    expect(response.body.data.title).toBe(newBlog.title)
  })
})

describe('Delete Blogs', () => {
  let allBlogs = []
  beforeAll(async () => {
    allBlogs = await getAllBlogs()
  })
  test('Deleting a blog', async () => {
    const response = await deleteBlog(allBlogs.body.data[0]._id)
    expect(response.body.data.title).toBe(allBlogs.body.data[0].title)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
