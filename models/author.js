const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)
// this will let export the info, and create the new DB table Author, based on the settings of the authorSchema. this will be used by the Routes, and must be set up there next.