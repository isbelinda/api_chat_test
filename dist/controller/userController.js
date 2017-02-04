'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendMessage = exports.updateTokenFCM = exports.remove = exports.edit = exports.create = exports.listsBySiteId = exports.lists = exports.login = undefined;

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
    var infoRequest = {
        username: req.body.username
    };

    MODEL.User.findOne(infoRequest, function (err, user) {
        if (!user) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.USER_NOT_FOUND));
        if (user.password != req.body.password) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.WRONG_PASSWORD));
        var token = _nodeUuid2.default.v1();

        MODEL.User.findOneAndUpdate({ userId: user.userId }, {
            $set: { token: token, updatedDate: new Date() }
        }, { upsert: false, new: true }, function (err, model) {
            console.log(model);
            var path = void 0;
            if (model.roleId == CONFIG.ROLETYPE.ADMIN) {
                path = 'chatRooms/' + model.siteId + '/';
                if (model.siteId == CONFIG.SITE.HANDIGO) {
                    path = 'chatRooms/' + model.siteId + '/' + model.hotelId + '/';
                }
            }

            return res.json({
                isSuccess: true,
                urlPath: CONFIG.FULLPATH,
                roomPath: path,
                results: model
            });

            // MAINCONTROLLER.isDefaultTemplate(res, err, model);
        });
    });
};

var lists = exports.lists = function lists(req, res) {
    MODEL.User.find(function (err, users) {
        if (err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));
        return res.json(MAINCONTROLLER.isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.ARRAY, users));
    });
};

var listsBySiteId = exports.listsBySiteId = function listsBySiteId(req, res) {};

var create = exports.create = function create(req, res) {
    var userRequest = req.body;
    userRequest.createdDate = new Date();
    userRequest.updatedDate = new Date();

    if (userRequest.roleId == CONFIG.ROLETYPE.ADMIN && userRequest.siteId == CONFIG.SITE.HANDIGO) {
        if (!userRequest.hotelId) return res.json({ isSuccess: false });
    }

    MODEL.User.findOne({ username: userRequest.username }, function (err, user) {
        if (user) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.USER_ALREADY));

        var userModel = new MODEL.User(userRequest);

        userModel.save(function (err, model) {
            MAINCONTROLLER.isDefaultTemplate(res, err, model);
        });
    });
};

var edit = exports.edit = function edit(req, res) {};

var remove = exports.remove = function remove(req, res) {};

var updateTokenFCM = exports.updateTokenFCM = function updateTokenFCM(req, res) {
    if (!req.body.token_fcm) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.TOKEN_NOT_PROVIDED));
    MAINCONTROLLER.isUpdateTokenFCM(req, res, MODEL.User);
};

var sendMessage = exports.sendMessage = function sendMessage(req, res) {
    MODEL.Device.findOne({ deviceId: req.body.deviceId }, function (err, device) {
        if (!device) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.DATA_NOT_FOUND));
        var receiveToken = device.token_fcm;
        var title = 'New message from Admin';

        var message = {
            to: receiveToken,
            notification: {
                title: title,
                body: req.body.notification.body
            }
        };

        // res.json(message);
        MAINCONTROLLER.isSendMessage(res, message);
    });
};