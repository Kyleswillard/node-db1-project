const router = require('express').Router()
const Account = require('./accounts-model')
const ExpressError = require('../expressError')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Account.getAll())
    } catch (err) {
        next(new ExpressError(err, 500))
    }
})

router.get('/:id', (req, res, next) => {
    res.status(200).json(req.post)
})

router.post('/', async (req, res, next) => {
    try {
        const data = await Account.create(req.body)
        res.status(201).json(data)
    } catch (err) {
        next(new ExpressError(err, 500))
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const data = await Account.updateById(req.params.id, req.body)
        res.json(data)
    } catch (err) {
        next(new ExpressError(err, 500))
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Account.deleteById(req.params.id)
        res.status(204).send('')
    } catch (err) {
        next(new ExpressError(err, 500))
    }
})

router.use((err, req, res, next) => {
    // eslint-disable-line
    // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
    next(err)
    res.status(500).json({
        message: 'something went wrong inside the accounts router',
        errMessage: err.message
    })
})

module.exports = router
