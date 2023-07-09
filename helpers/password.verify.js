const bcrypt = require('bcrypt')

const verifyPassword = async (pass, hash) => {
  const isMatch = await bcrypt.compare(pass, hash)

  return isMatch
}

module.exports = verifyPassword
