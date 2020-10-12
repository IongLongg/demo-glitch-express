const Joi = require('joi')
const Book = require("../../models/book.model")

module.exports.createBookSchema = async (req, res, next) => {
    const schema = Joi.object({
        title : Joi.string().required(),
        cover : Joi.string(),
        description : Joi.string().required()
    })
    validateRequest(req, next, schema)
}

const validateRequest = (req, next, schema) => {
    const options = {
        abortEarly : false, // all errors
        allowUnknown : true, // ignore unknown props
        stripUnknown : true //remove Unknown props 
    }

    const { error, value } = schema.validate(req.body, options)
    if(error){
        next(`Validation error: ${error.details.map(err => err.message).join(',')}`)
    } else {
        req.body = value
        next()
    }
}