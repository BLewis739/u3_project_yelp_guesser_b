const { User, Leaderboard } = require('../models')
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
    const leaderboardName = `${username}'s Top Five Scores`
    await Leaderboard.create({ name: leaderboardName })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.body.id } })
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        req.body.oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword)

      await user.update({ passwordDigest })
      return res.send({ status: 'Success', msg: 'Password Updated' })
    }
    res.status(401).send({ status: 'Error', msg: 'Invalid Credentials' })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals

  res.send(payload)
}

const DeleteUser = async (req, res) => {
  try {
    const deleteUser = await User.Destroy({ where: { id: req.params.id } })
    res.send(deleteUser)
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'user id does not exist' })
  }
}

module.exports = {
  Login,
  Register,
  updatePassword,
  CheckSession,
  DeleteUser
}
