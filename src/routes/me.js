const me = (req, res) => {
  if(!req.user){
    res.staus(400)
    res.send({
      success : false
    })
    return
  }

  const reducedUser = {
    id: req.user.account_id,
    email: req.user.email,
    fname: req.user.fname,
    sname: req.user.sname
  }

  res.status(200)
  res.send({
    success: true,
    user : reducedUser
  })
}

module.exports = me