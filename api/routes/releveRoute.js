let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let releveTempSchema = require('../models/ReleveTemp');

//CREATE RELEVE
router.route('/AjoutReleve').post((req, res, next) => {
    let response = {
        status : 'success',
        message : ''
    }
    releveTempSchema.create(req.body, (error, data) => {
        
        if (error) {
           response.status='error'
           response.message=error.getMessage();
        } else {
           response.message='Ajouté avec succes';
        }
        res.json(response);
    })
});

//READ RELEVE
router.route('/ListReleve').get((req, res) => {
    releveTempSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single RELEVE
router.route('/ListBU/:id').get((req, res) => {
    businessUnitSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update RELEVE
router.route('/update-Plateau/:id').put((req, res, next) => {
    businessUnitSchema.findByIdAndUpdate(req.params.id, {
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

// Delete RELEVE
router.route('/delete-Plateau/:id').delete((req, res, next) => {
    businessUnitSchema.findByIdAndRemove(req.params.id, (error, data) => {
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