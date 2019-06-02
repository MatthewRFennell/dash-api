const { Storage } = require('@google-cloud/storage')

const storage = new Storage()

const sendImageToGCS = (req, res, id, next) => {
  const bucketName = 'dasheventimages'
  const bucket = storage.bucket(bucketName)
  const gcsFileName = `${id}-${req.body.name}`
  const file = bucket.file(gcsFileName)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    console.log('ERR', err)
    next(err)
  })

  stream.on('finish', () => {
    console.log('Finished')
    next(`https://storage.googleapis.com/${bucketName}/${gcsFileName}`)
  })

  stream.end(req.file.buffer)
}

module.exports = sendImageToGCS