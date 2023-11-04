const { app, server } = require('../../index')
const supertest = require('supertest')
const api = supertest(app)

const initialBlogs = [
  {
    title: '10 Maneras de Encontrar trabajo remoto',
    description: 'Si aun no encuentra un trabajo este blog es para ti',
    category: 'javascript',
    content:
      'Vea qué publicaciones tienen más éxito con los análisis integrados de Blogger. Podrás saber de dónde viene tu audiencia y cuáles son sus intereses. Incluso puedes conectar tu blog directamente a Google Analytics para examinarlo más profundamente.',
    image:
      'https://img.freepik.com/foto-gratis/concepto-fondo-estudio-fondo-purpura-sitio-estudio-pendiente-ligera-vacia-abstracta-producto-fondo-liso-estudio_1258-63884.jpg',
    sections: [
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
  },
  {
    title: '20 Maneras de Encontrar trabajo remoto',
    description: 'Si aun no encuentra un trabajo este blog es para ti',
    category: 'javascript',
    content:
      'Vea qué publicaciones tienen más éxito con los análisis integrados de Blogger. Podrás saber de dónde viene tu audiencia y cuáles son sus intereses. Incluso puedes conectar tu blog directamente a Google Analytics para examinarlo más profundamente.',
    image:
      'https://img.freepik.com/foto-gratis/concepto-fondo-estudio-fondo-purpura-sitio-estudio-pendiente-ligera-vacia-abstracta-producto-fondo-liso-estudio_1258-63884.jpg',
    sections: [
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
]

const baseUrl = '/api/v1/blogs'
const getAllBlogs = async () => api.get(baseUrl)

const getOneBlog = async (id) => await api.get(`${baseUrl}/${id}`)

const createOneBlog = async (blog) => api.post(baseUrl).send(blog)

const deleteBlog = async (id) => api.delete(`${baseUrl}/${id}`)

const updateBlog = async (id, data) => await api.put(`${baseUrl}/${id}`).send(data)

module.exports = { initialBlogs, server, getAllBlogs, getOneBlog, createOneBlog, deleteBlog, updateBlog }
