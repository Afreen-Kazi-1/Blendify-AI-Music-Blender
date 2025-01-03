const createError = require('http-errors')
const User = require('../models/user')
const { userValidationSchema, loginValidationSchema } = require('../validationschema')
const { signAccessToken, signRefreshtoken, verifyAccessToken, verifyRefreshToken, revokeToken } = require('../jwt')
const revokedTokens = new Set()

module.exports = {
    
    register: async(req, res, next) => {
        try {
            const {email, name, username, password} =req.body
            const result = await userValidationSchema.validateAsync(req.body)
            console.log(result)
     
     
            const doesExist = await User.findOne({email: email })
            if (doesExist) throw createError.Conflict('${email} has already been registered')
     
     
            const user = new User({email, name, username, password})
            const savedUser = await user.save()
            const accesstoken = await signAccessToken(savedUser.id)
            const refreshtoken = await signRefreshtoken(savedUser.id)
     
            res.send({ accesstoken, refreshtoken })
     
     
            res.send(savedUser)
        } catch (error) {
            next(error)
        }
     },
     
     login: async(req, res, next) => {
        try {
         const result = await loginValidationSchema.validateAsync(req.body)
         const user = await User.findOne({ username: result.username })
     
         if (!user) throw createError.NotFound('User not registered')
         const isMatch = await user.isValidPassword(result.password)
         if (!isMatch) throw createError.Unauthorized('Username/Password not valid')
     
         const accesstoken = await signAccessToken(user.id)
         const refreshtoken = await signRefreshtoken(user.id)
     
         res.send({ accesstoken, refreshtoken})
         
        } catch (error) {
         if(error.isjoi == true) return next(createError.BadRequest('Invalid username/password'))
         next(error)
         
        }
     },

     refreshToken: async(req, res, next) => {
        try {
         const { refreshtoken } = req.body
         if (!refreshtoken) throw createError.BadRequest()
         const username = await verifyRefreshToken(refreshtoken)
     
         const accesstoken = await signAccessToken(username)
         const newrefreshtoken = await signRefreshtoken(username)
         res.send({accesstoken: accesstoken, refreshtoken: newrefreshtoken})
         
        } catch (error) {
         next(error)
        }
     },

     delete: async (req, res, next) => {
        try {
            console.log(req.body); 
            const  refreshtoken  = req.body.refreshToken
    
            if (!refreshtoken) {
                throw createError.BadRequest('Refresh token is required');
            }
            await verifyRefreshToken(refreshtoken);
    
            revokeToken(refreshtoken);
    
            res.status(200).send({ message: 'User logged out successfully' });
        } catch (error) {
            next(error);
        }
    }
}