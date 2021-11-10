let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();

let operationSchema = require('../models/Operation');

//CREATE OP
router.route('/AjoutOperation').post((req, res, next) => {
    operationSchema.create(req.body, (error, data) => {
        
        if (error) {
            console.log(error)
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//READ OP
router.route('/ListOperation').get((req, res) => {
    operationSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single OP
router.route('/edit-Plateau/:id').get((req, res) => {
    operationSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update OP
router.route('/update-Plateau/:id').put((req, res, next) => {
    operationSchema.findByIdAndUpdate(req.params.id, {
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

// Delete OP
router.route('/delete-Plateau/:id').delete((req, res, next) => {
    operationSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
