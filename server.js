require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT

const userRouter = require('./routes/user')
const jobRouter = require('./routes/job')
const resumeRouter = require('./routes/resume')
const applicationRouter = require('./routes/application')
const notificationRouter = require('./routes/notification')

const app = express()
app.use(express.json())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/resume', resumeRouter)
app.use('/api/v1/application', applicationRouter)
app.use('/api/v1/notification', notificationRouter)

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database is connected');
    app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
}).catch((error)=>{
    console.log('Unable to connect:', error.message);
    
})
