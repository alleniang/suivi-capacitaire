const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let climatiseurSchema = new Schema({
    libelle:{
        type: String
    },

    plateau:{
        type: ObjectID
    },

    marque:{
        type: String
    },

    chevaux:{
        type: Number
    },

    etat:{
        type: String
    }

}, {
    collection: 'climatiseur'
})

module.exports = mongoose.model('Climatiseur', climatiseurSchema)