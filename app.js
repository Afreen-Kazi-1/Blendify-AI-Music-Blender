const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require ('./mongodb')
const { verifyAccessToken} = require('./jwt')

const AuthRoute = require('./routes/auth.route')
const ProfileRoute = require('./routes/profile.route')
const userSettingsRoute = require('./routes/usersettings.route')
const landingPageRoute = require('./routes/landingpage.route')
const generalPagesRoute = require('./routes/generalpage.route')
const supportRoute = require('./routes/supportpage.route')
const communityRoute = require('./routes/community.route')
const blendPageRoute = require('./routes/blendpage.route')

const session = require('express-session');
const passport = require('./passport');
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', verifyAccessToken, async (req, res, next) => {
    
    res.send('Hello from express.')
})

app.use(express.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', AuthRoute)

app.use('/api', ProfileRoute);

app.use('/user', userSettingsRoute)

app.use('/', landingPageRoute)

app.use('/pages', generalPagesRoute)

app.use('/support', supportRoute)

app.use('/community', communityRoute)

app.use('/blendpage', blendPageRoute)


app.use(async(req, res, next) => {
    next(createError.NotFound('This route does not exist'))
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500; 
    res.status(statusCode).send({
        error: {
            status: statusCode,
            message: err.message || 'Internal Server Error',
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})


