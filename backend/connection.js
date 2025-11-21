const mongoose = require('mongoose')
mongoose.set("strictQuery",true)
async function connectMongodb(params) {
    return mongoose.connect(params)       
}
module.exports = { connectMongodb }