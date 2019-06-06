const db = require('../../db')

const sendImageToGCS = require('../../gcs')

const setLogo = (req, res) => {
  if (!req.body.account_id || !req.file) {
    res.status(400)
    res.send({
      success: false,
      message: 'Missing account id or file!'
    })
    return
  }
  db.Account.findOne({
    where: {
      account_id: req.body.account_id
    }
  })
    .then(account => {
      if (account === null) throw new Error('No matching account!')
      sendImageToGCS(req.file, `${account.account_id}-${account.fname}`, (url) => {
        console.log('returned, image uploaded')
        account.update({
          logo_image: url
        }).then(() => {
          res.send({
            success: true,
            url
          })
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Attendee does not exist!'
      })
    })
}

module.exports = setLogo