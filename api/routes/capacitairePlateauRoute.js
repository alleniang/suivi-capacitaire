let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let capacitairePlateauSchema = require('../models/CapacitairePlateau');

//CREATE CAPACITAIRE PLATEAU
router.route('/AjoutCapacitairePlateau').post((req, res, next) => {
    capacitairePlateauSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//READ CAPACITAIRE PLATEAU
router.route('/ListCapacitairePlateau').get((req, res) => {
    capacitairePlateauSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single CAPACITAIRE Plateau
router.route('/edit-CapacitairePlateau/:id').get((req, res) => {
    capacitairePlateauSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update CAPACITAIRE Plateau
router.route('/update-CapacitairePlateau/:id').put((req, res, next) => {
    capacitairePlateauSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Capacitaire Plateau updated successfully !')
        }
    })
})

// Delete CAPACITAIRE Plateau
router.route('/delete-CapacitairePlateau/:id').delete((req, res, next) => {
    capacitairePlateauSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
