const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let plateauSchema = new Schema({
    libelle:{
        type: String
    },
    operation:{
        type: ObjectId
    },
}, {
    collection: 'plateau'
})

module.exports = mongoose.model('Plateau', plateauSchema)