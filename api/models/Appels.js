const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AppelsSchema = new Schema({
    operation:{
        type: ObjectId
    },

    appels:{
        type: Number
    },

    previsions:{
        type: Number
    },
    
}, {
    collection: 'appels'
})

module.exports = mongoose.model('Appels', AppelsSchema)