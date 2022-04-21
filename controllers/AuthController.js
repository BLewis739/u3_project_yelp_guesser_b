const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        username: user.username
      }
      let token = middleware.createToken(payload)
      res.send({ user: payload, token })
    }
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { username, password, zipcode } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({ username, passwordDigest, zipcode })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const updatePassword = async (req, res) => {
  try {
    let passwordDigest = await middleware.hashPassword(req.body.password)
    const user = await User.update(
      { passwordDigest: passwordDigest },
      {
        where: { id: req.params.user_id },
        returning: true
      }
    )
    res.send(user)
  } catch (error) {}
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals

  res.send(payload)
}

module.exports = {
  Login,
  Register,
  updatePassword,
  CheckSession
}
