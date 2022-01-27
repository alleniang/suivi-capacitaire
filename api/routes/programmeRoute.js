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
router.route('/edit-programme/:id').get((req, res) => {
    programmeSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Programme
router.route('/update-programme/:id').put((req, res, next) => {
    programmeSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Programme updated successfully !')
        }
    })
})

// Delete Programme
router.route('/delete-Programme/:id').delete((req, res, next) => {
    programmeSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
