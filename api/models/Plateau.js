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
        type: String
    },
    boxes:{
        type: String
    },
    positions:{
        type: String
    },
    positionsOK:{
        type: String
    },
}, {
    collection: 'plateau'
})

module.exports = mongoose.model('Plateau', plateauSchema)