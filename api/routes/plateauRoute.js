let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let plateauSchema = require('../models/Plateau');

//CREATE PLATEAU
router.route('/AjoutPlateau').post((req, res, next) => {
    plateauSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//READ PLATEAU
router.route('/ListPlateau').get((req, res) => {
    plateauSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single Plateau
router.route('/edit-Plateau/:id').get((req, res) => {
    studentSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Plateau
router.route('/update-Plateau/:id').put((req, res, next) => {
    studentSchema.findByIdAndUpdate(req.params.id, {
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

// Delete Plateau
router.route('/delete-Plateau/:id').delete((req, res, next) => {
    plateauSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
