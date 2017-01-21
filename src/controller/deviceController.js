var deviceModel = require('../models/deviceModel.js');

/**
 * deviceController.js
 *
 * @description :: Server-side logic for managing devices.
 */
module.exports = {

    /**
     * deviceController.list()
     */
    list: function (req, res) {
        deviceModel.find(function (err, devices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting device.',
                    error: err
                });
            }
            return res.json(devices);
        });
    },

    /**
     * deviceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        deviceModel.findOne({_id: id}, function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting device.',
                    error: err
                });
            }
            if (!device) {
                return res.status(404).json({
                    message: 'No such device'
                });
            }
            return res.json(device);
        });
    },

    /**
     * deviceController.create()
     */
    create: function (req, res) {
        var device = new deviceModel({			username : req.body.username,			password : req.body.password,			siteId : req.body.siteId,			token : req.body.token,			token_fcm : req.body.token_fcm,			hotelId : req.body.hotelId
        });

        device.save(function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating device',
                    error: err
                });
            }
            return res.status(201).json(device);
        });
    },

    /**
     * deviceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        deviceModel.findOne({_id: id}, function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting device',
                    error: err
                });
            }
            if (!device) {
                return res.status(404).json({
                    message: 'No such device'
                });
            }

            device.username = req.body.username ? req.body.username : device.username;			device.password = req.body.password ? req.body.password : device.password;			device.siteId = req.body.siteId ? req.body.siteId : device.siteId;			device.token = req.body.token ? req.body.token : device.token;			device.token_fcm = req.body.token_fcm ? req.body.token_fcm : device.token_fcm;			device.hotelId = req.body.hotelId ? req.body.hotelId : device.hotelId;			
            device.save(function (err, device) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating device.',
                        error: err
                    });
                }

                return res.json(device);
            });
        });
    },

    /**
     * deviceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        deviceModel.findByIdAndRemove(id, function (err, device) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the device.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
