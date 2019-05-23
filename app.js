const express = require('express')
const logger = require('./src/util')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  logger.info(`Request received.`)
  res.send({
    package: 'Hello World',
  })
})

app.get('/kill', (req, res) => {
  logger.error(`Time to die.`)
  res.send(`You're a murderer!`)
  process.exit(1)
})

app.listen(port, () => {
  logger.info(`Dash Backend started on port ${port}`)
})