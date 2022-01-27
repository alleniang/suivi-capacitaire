let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();


let capacitaireSchema = require('../models/Capacitaire');
let appelsSchema = require('../models/Appels');

//CREATE PREV CAPACITAIRE
router.route('/Capacitaire/Ajout').post((req, res, next) => {
    let response = {
        status : 'success',
        message : ''
    }
    capacitaireSchema.create(req.body, (error, data) => {
        
        if (error) {
           response.status='error'
           response.message=error.getMessage();
        } else {
           response.message='Ajouté avec succes';
        }
        res.json(response);
    })
});

//CREATE PREV APPELS
router.route('/Appels/Ajout').post((req, res, next) => {
    let response = {
        status : 'success',
        message : ''
    }
    appelsSchema.create(req.body, (error, data) => {
        
        if (error) {
           response.status='error'
           response.message=error.getMessage();
        } else {
           response.message='Ajouté avec succes';
        }
        res.json(response);
    })
});

//READ PREV CAPACITAIRE
router.route('/Capacitaire/ListCapacitaire').get((req, res) => {
    capacitaireSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//READ PREV APPELS
router.route('/Appels/ListAppels').get((req, res) => {
    appelsSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update PREV CAPACITAIRE
router.route('/Capacitaire/update-Capacitaire/:id').put((req, res, next) => {
    capacitaireSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            
        }
    })
})

// Update PREV APPELS
router.route('/Appels/update-Appels/:id').put((req, res, next) => {
    appelsSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            
        }
    })
})

// Delete PREV CAPACITAIRE
router.route('/Capacitaire/delete-Capacitaire/:id').delete((req, res, next) => {
    capacitaireSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Delete PREV APPELS
router.route('/Appels/delete-Appels/:id').delete((req, res, next) => {
    appelsSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
