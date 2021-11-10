const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProgrammeSchema = new Schema({
    libelle:{
        type: String
    },

    bU:{
        type: ObjectId
    },
    
}, {
    collection: 'programme'
})

module.exports = mongoose.model('Programme', ProgrammeSchema)