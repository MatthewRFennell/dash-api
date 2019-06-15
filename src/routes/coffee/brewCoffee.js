const brewCoffee = (req, res) => {
  res.status(418)
  res.send({
    success: false,
    message: 'I\'m a teapot'
  })
}

module.exports = brewCoffee