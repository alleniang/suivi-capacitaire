let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let climatiseurSchema = require('../models/Climatiseur');

//CREATE Climatiseur
router.route('/AjoutClimatiseur').post((req, res, next) => {
    climatiseurSchema.create(req.body, (error, data) => {
        
        if (error) {
            console.log(error)
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//READ Climatiseur
router.route('/ListClimatiseur').get((req, res) => {
    climatiseurSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single Climatiseur
router.route('/edit-Climatiseur/:id').get((req, res) => {
    climatiseurSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Climatiseur
router.route('/update-Climatiseur/:id').put((req, res, next) => {
    climatiseurSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Plateau updated successfully !')
        }
    })
})

// Delete Climatiseur
router.route('/delete-Climatiseur/:id').delete((req, res, next) => {
    climatiseurSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
