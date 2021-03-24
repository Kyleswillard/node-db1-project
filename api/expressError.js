//This code is from our guided lecture, I wanted to try it out to extend the error handling for this assignment, that said I do want to get harassed about plagerism so I wanted to cite my sourcing. Kirkby provided this in his notes for this module.

class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode || 500
    }
}

module.exports = ExpressError
