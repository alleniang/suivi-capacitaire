const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let releveTempSchema = new Schema({
    date:{
        type: String
    },
    
    plateau:{
        type: ObjectID
    },

    temperature:{
        type: Number
    }

}, {
    collection: 'releveTemp'
})

module.exports = mongoose.model('ReleveTemp', releveTempSchema)