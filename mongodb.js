const mongoose = require('mongoose')
mongoose.connect ('mongodb+srv://Tisha:blendify123%40@blendify1.kpyak.mongodb.net/?retryWrites=true&w=majority&appName=blendify1')
.then(() => {
    console.log('connection successful')
})
.catch((err) => console.log(err.message))
 
mongoose.connection.on('connected', () => {
    console.log('mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoose connection is disconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})