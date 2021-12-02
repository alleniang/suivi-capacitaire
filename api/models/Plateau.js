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
    site:{
        type: String
    },
    capacite:{
        type: Number
    },
    boxes:{
        type: Number
    },
    positions:{
        type: Number
    },
    positionsOK:{
        type: Number
    },
}, {
    collection: 'plateau'
})

module.exports = mongoose.model('Plateau', plateauSchema)