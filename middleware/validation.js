const joi = require('joi')

exports.createUserValidator = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).required().messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'any.required': 'Name is required'
        }),
        email: joi.string().trim().email().required().messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty',
            'string.pattern.base': 'Password must be at least 8 characters and include upper and lower case'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.verifyEmailValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().trim().email().required().messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        otp: joi.string().trim().required().messages({
            'string.empty': 'OTP is required',
            'any.required': 'OTP is required'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.loginValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().trim().email().required().messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        password: joi.string().trim().required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.createJobValidator = (req, res, next) => {
    const schema = joi.object({
        title: joi.string().trim().min(2).required().messages({
            'string.base': 'Title must be a string',
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 2 characters long',
            'any.required': 'Title is required'
        }),
        description: joi.string().trim().min(10).required().messages({
            'string.base': 'Description must be a string',
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters long',
            'any.required': 'Description is required'
        }),
        location: joi.string().trim().min(2).required().messages({
            'string.base': 'Location must be a string',
            'string.empty': 'Location is required',
            'string.min': 'Location must be at least 2 characters long',
            'any.required': 'Location is required'
        }),
        jobType: joi.string().valid('full-time', 'part-time', 'contract', 'internship', 'remote', 'hybrid').required().messages({
            'any.only': 'Job type must be one of full-time, part-time, contract, internship, remote, or hybrid',
            'string.empty': 'Job type is required',
            'any.required': 'Job type is required'
        }),
        salary: joi.object({
            min: joi.number().min(0).required(),
            max: joi.number().min(joi.ref('min')).required(),
            currency: joi.string().trim().uppercase().default('NGN')
        }).optional(),
        skills: joi.array().items(joi.string().trim()).min(1).optional(),
        requirements: joi.array().items(joi.string().trim()).min(1).optional(),
        status: joi.string().valid('open', 'closed', 'draft').optional().messages({
            'any.only': 'Status must be open, closed, or draft'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.createResumeValidator = (req, res, next) => {
    const schema = joi.object({
        fileName: joi.string().trim().min(1).required().messages({
            'string.base': 'File name must be a string',
            'string.empty': 'File name is required',
            'string.min': 'File name is required',
            'any.required': 'File name is required'
        }),
        fileUrl: joi.string().trim().uri({ scheme: ['http', 'https'] }).required().messages({
            'string.base': 'File URL must be a string',
            'string.empty': 'File URL is required',
            'string.uri': 'Please provide a valid file URL',
            'any.required': 'File URL is required'
        }),
        fileType: joi.string().valid(
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ).required().messages({
            'any.only': 'File type must be PDF or Word document',
            'string.empty': 'File type is required',
            'any.required': 'File type is required'
        }),
        skills: joi.array().items(joi.string().trim().min(1)).min(1).optional().messages({
            'array.min': 'Skills must contain at least one item'
        }),
        experience: joi.string().trim().allow('').optional(),
        education: joi.string().trim().allow('').optional()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}
