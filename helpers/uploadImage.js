const multer = require('multer') // Utilizaremos multer para procesar la imagen.

// Configurar multer para manejar las imágenes que se envían a '/blogs/image'.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/blogs') // La carpeta donde se guardarán las imágenes.
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // Usaremos el nombre original del archivo.
  }
})
const upload = multer({ storage })

module.exports = { upload }
