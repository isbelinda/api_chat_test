'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendMessage = exports.updateTokenFCM = exports.login = undefined;

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _models = require('../app/models');

var MODEL = _interopRequireWildcard(_models);

var _config = require('../app/config');

var CONFIG = _interopRequireWildcard(_config);

var _mainController = require('../controller/mainController');

var MAINCONTROLLER = _interopRequireWildcard(_mainController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = function login(req, res) {
    var infoRequest = { username: req.body.username, password: req.body.password };
    if (req.body.siteId == CONFIG.SITE.HANDIGO) {
        // if(!req.body.serialNumber) return
        infoRequest = { serialNumber: req.body.serialNumber };
    }
    console.log(infoRequest);
    MODEL.Device.findOne(infoRequest, function (err, device) {
        if (err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));

        if (!device) {
            create(req, res);
        } else {
            MODEL.Device.findOneAndUpdate({ deviceId: device.deviceId }, {
                $set: { token: _nodeUuid2.default.v1(), updatedDate: new Date(), infoSite: req.body.infoSite }
            }, { upsert: false, new: true }, function (err, model) {
                MAINCONTROLLER.isDefaultTemplate(res, err, model);
            });
        }
    });
};

var create = function create(req, res) {
    req.body.createdDate = new Date();
    req.body.updatedDate = new Date();
    req.body.token = _nodeUuid2.default.v1();
    var deviceModel = new MODEL.Device(req.body);

    deviceModel.save(function (err, model) {
        MAINCONTROLLER.isDefaultTemplate(res, err, model);
    });
};

var updateTokenFCM = exports.updateTokenFCM = function updateTokenFCM(req, res) {
    if (!req.body.token_fcm) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.TOKEN_NOT_PROVIDED));
    MAINCONTROLLER.isUpdateTokenFCM(req, res, MODEL.Device);
};

var sendMessage = exports.sendMessage = function sendMessage(req, res) {
    MODEL.User.findOne({ siteId: req.infoToken.siteId }, function (err, user) {
        if (!user) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.DATA_NOT_FOUND));
        // let receiveToken = `d4ol-GDihLw:APA91bG0mjbmZmXrpg0p6sBhXvs5CEKittshNvg3vXnJ7FVh4ZdYKoqkRQiM-X6yr_PQrxVGVG9XTzqgX_vr-pg6Bq_2OVn6Mm5xa2H6b1HDOvh7K1Z6avSDf_k5XnWqhjB0W5g99zHX`;
        var receiveToken = user.token_fcm;
        var chatRoomPath = 'http://localhost:5000/#!/chatRooms/chat/' + req.infoToken.deviceId;
        var title = req.infoToken.username;

        if (req.infoToken.siteId == CONFIG.SITE.HANDIGO) {
            title = req.infoToken.infoSite.hotelName + ' No.' + req.infoToken.infoSite.room;
        }

        var message = {
            to: receiveToken,
            notification: {
                title: title,
                body: req.body.notification.body,
                click_action: chatRoomPath
            }
        };

        // res.send(message);
        MAINCONTROLLER.isSendMessage(res, message);
    });
};