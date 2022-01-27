const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CapacitaireSchema = new Schema({
    operation:{
        type: ObjectId
    },

    capacitaire:{
        type: Number
    },

    previsions:{
        type: Number
    },
    
}, {
    collection: 'capacitaire'
})

module.exports = mongoose.model('Capacitaire', CapacitaireSchema)