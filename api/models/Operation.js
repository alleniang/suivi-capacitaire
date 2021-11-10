const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OperationSchema = new Schema({
    libelle:{
        type: String
    },

    programme:{
        type: ObjectId
    },
    
}, {
    collection: 'operation'
})

module.exports = mongoose.model('Operation', OperationSchema)