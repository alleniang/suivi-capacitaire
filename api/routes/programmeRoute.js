let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let programmeSchema = require('../models/Programme');

//CREATE Programme
router.route('/AjoutProgramme').post((req, res, next) => {
    programmeSchema.create(req.body, (error, data) => {
        
        if (error) {
            console.log(error)
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//READ Programme
router.route('/ListProgramme').get((req, res) => {
    programmeSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single Programme
router.route('/edit-Plateau/:id').get((req, res) => {
    studentSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Programme
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

// Delete Programme
router.route('/delete-Plateau/:id').delete((req, res, next) => {
    studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
