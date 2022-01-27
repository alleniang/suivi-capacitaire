let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let businessUnitSchema = require('../models/BusinessUnit');

//CREATE BU
router.route('/AjoutBU').post((req, res, next) => {
    let response = {
        status : 'success',
        message : ''
    }
    businessUnitSchema.create(req.body, (error, data) => {
        
        if (error) {
           response.status='error'
           response.message=error.getMessage();
        } else {
           response.message='Ajouté avec succes';
        }
        res.json(response);
    })
});

//READ BU
router.route('/ListBU').get((req, res) => {
    businessUnitSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single BU
router.route('/ListBU/:id').get((req, res) => {
    businessUnitSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update BU
router.route('/update-bu/:id').put((req, res, next) => {
    businessUnitSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Bu updated successfully !')
        }
    })
})

// Delete BU
router.route('/delete-Bu/:id').delete((req, res, next) => {
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
