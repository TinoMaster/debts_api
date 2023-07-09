const bcrypt = require('bcrypt')

const hashPassword = async (pass) => {
  const hash = await bcrypt.hash(pass, 10)
  return hash
}

module.exports = hashPassword
