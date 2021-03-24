const ExpressError = require('../expressError')
const Account = require('./accounts-model')
exports.checkAccountPayload = (req, res, next) => {
    const newAccount = req.body
    if (!newAccount.name && !newAccount.budget) {
        const err = new ExpressError('Name and Budget are required!', 400)
        next(err)
    } else {
        next()
    }
}

// NOTE: Unique Account Name could be done more effectively in other ways!!! For example Mongoose allows you require a unique account name in the schema as an option.

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const account = await Account.getAll().find(name => req.body.name === res.body.name)
    next(account)
  } catch (err) {
next(new ExpressError(err, 500))
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id) {
      if(account) {
        req.account = account
        next()
      } else {
        const err = new ExpressError('ID not found!', 400)
        next(err)
      }
    }
  } catch (err) {
    next(new ExpressError(err, 500))
  }
}
