const logger = require('./logger')
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.slice(7)
        return next()
    }
    request.token = null
    return next()
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get("authorization");

    const decodedToken = jwt.verify(
        authorization.substring(7),
        process.env.SECRET
    );
    const user = await User.findById(decodedToken.id);

    authorization && authorization.toLowerCase().startsWith("bearer ")
        ? (request.user = user)
        : (request.user = null);

    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}