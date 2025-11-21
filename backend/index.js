const express = require('express')
const userRegister = require('./routes/users')
const useLogin = require('./routes/login')
const usePosts = require('./routes/posts')
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const { connectMongodb } = require('./connection');
const { authentication } = require('./middlewares');
const app = express()
const PORT = 8000


// connection
connectMongodb('mongodb://localhost:27017/Blog_management')
    .then(() => console.log('database connected'))
    .catch((err) => console.log('Error connecting database', err))


// plugins
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());


// routes
app.use('/api/auth/register', userRegister)
app.use('/api/auth/login', useLogin)

// middlewares

app.use(authentication())

// post routes
app.use('/api/posts', usePosts)


app.listen(PORT, () => console.log(`Server is running on ${PORT} port`)
)