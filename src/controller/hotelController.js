var HotelModel = require('../models/HotelModel.js');

/**
 * HotelController.js
 *
 * @description :: Server-side logic for managing Hotels.
 */
module.exports = {

    /**
     * HotelController.list()
     */
    list: function (req, res) {
        HotelModel.find(function (err, Hotels) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Hotel.',
                    error: err
                });
            }
            return res.json(Hotels);
        });
    },

    /**
     * HotelController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        HotelModel.findOne({_id: id}, function (err, Hotel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Hotel.',
                    error: err
                });
            }
            if (!Hotel) {
                return res.status(404).json({
                    message: 'No such Hotel'
                });
            }
            return res.json(Hotel);
        });
    },

    /**
     * HotelController.create()
     */
    create: function (req, res) {
        var Hotel = new HotelModel({			hotelName : req.body.hotelName
        });

        Hotel.save(function (err, Hotel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Hotel',
                    error: err
                });
            }
            return res.status(201).json(Hotel);
        });
    },

    /**
     * HotelController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        HotelModel.findOne({_id: id}, function (err, Hotel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Hotel',
                    error: err
                });
            }
            if (!Hotel) {
                return res.status(404).json({
                    message: 'No such Hotel'
                });
            }

            Hotel.hotelName = req.body.hotelName ? req.body.hotelName : Hotel.hotelName;			
            Hotel.save(function (err, Hotel) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Hotel.',
                        error: err
                    });
                }

                return res.json(Hotel);
            });
        });
    },

    /**
     * HotelController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        HotelModel.findByIdAndRemove(id, function (err, Hotel) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Hotel.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
