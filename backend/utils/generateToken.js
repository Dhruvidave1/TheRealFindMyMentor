import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  // token has user id embedded, a secret, and it expries in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export { generateToken }