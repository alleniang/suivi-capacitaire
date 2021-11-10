const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let businessUnitSchema = new Schema({
    libelle:{
        type: String
    },
    
}, {
    collection: 'businessUnit'
})

module.exports = mongoose.model('BusinessUnit', businessUnitSchema)