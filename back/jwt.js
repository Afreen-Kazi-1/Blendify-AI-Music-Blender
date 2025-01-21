const jwt = require('jsonwebtoken')
const createError = require ('http-errors')
const revokedTokens = new Set()


module.exports = {
    signAccessToken: (username) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId: username,
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: "1h",
                issuer: 'blendify.com',
                audience: username,
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    return reject(createError.InternalServerError)
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err){
                if (err.name == 'JsonWebTokenError'){
                    return next(createError.Unauthorized())

                }else{
                    return next(createError.Unauthorized(err.message))
                }    
            }
            req.payload = payload
            next()
        })

    },

    signRefreshtoken: (username) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: "1y",
                issuer: 'blendify.com',
                audience: username,
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    return reject(createError.InternalServerError)
                }
                resolve(token)
            })
        })
    },

    verifyRefreshToken:(refreshtoken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createError.Unauthorized())
                const username = payload.aud

                resolve(username)
            })
        })
    },
    revokeToken: (token) => {
        revokedTokens.add(token); // Add token to the revocation list
    },
}