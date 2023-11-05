const cubbitConfig = require('../configs/cubbit.config')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')

const saveImageInCubbit = async ({ image, imageName }) => {
  const imageStream = fs.createReadStream(image.path)
  // Configura las credenciales y la región
  const s3Client = new S3Client({
    region: 'eu-west-1',
    endpoint: 'https://s3.cubbit.eu', // Usa el endpoint de Cubbit
    credentials: {
      accessKeyId: cubbitConfig.accessKeyId,
      secretAccessKey: cubbitConfig.secretAccessKey
    }
  })

  // Configura los parámetros para S3
  const params = {
    Bucket: cubbitConfig.bucketName,
    Key: imageName, // Nombre del archivo que quieres guardar en S3
    Body: imageStream,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  }

  try {
    await s3Client.send(new PutObjectCommand(params))

    fs.unlink(`public/blogs/${imageName}`, (err) =>
      err ? console.error('Error al eliminar el archivo:', err) : console.log('Archivo eliminado con éxito.')
    )
    const location = `https://${params.Bucket}.s3.cubbit.eu/${params.Key}`
    console.log(`Archivo subido exitosamente a ${location}`)
    return { success: true, location }
  } catch (err) {
    console.log('Error', err)
    return { success: false, error: err.message }
  }
}

module.exports = { saveImageInCubbit }
