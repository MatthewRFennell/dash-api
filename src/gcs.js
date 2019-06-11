const { Storage } = require('@google-cloud/storage')
const uuid = require('uuidv4')

const storage = new Storage()

const sendImageToGCS = (image, event, next) => {
  const bucketName = 'dasheventimages'
  const gcsFileName = uuid()
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(gcsFileName)

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  })

  stream.on('error', (err) => {
    image.cloudStorageError = err
    console.log('ERR', err)
    next(err)
  })

  stream.on('finish', () => {
    console.log('Finished')
    next(`https://storage.googleapis.com/${bucketName}/${gcsFileName}`)
  })

  stream.end(image.buffer)
}

module.exports = sendImageToGCS