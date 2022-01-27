const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let capacitairePlateauSchema = new Schema({
    date:{
        type: String
    },
    plateau:{
        type: ObjectId
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
    collection: 'capacitairePlateau'
})

module.exports = mongoose.model('CapacitairePlateau', capacitairePlateauSchema)