'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRooms = exports.isSendMessage = exports.isUpdateTokenFCM = exports.isDefaultTemplate = exports.isJsonSuccessTemplate = exports.isJsonErrorTemplate = exports.getToken = undefined;

var _config = require('../app/config');

var CONFIG = _interopRequireWildcard(_config);

var _models = require('../app/models');

var MODEL = _interopRequireWildcard(_models);

var _fcmPush = require('fcm-push');

var _fcmPush2 = _interopRequireDefault(_fcmPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fcm = new _fcmPush2.default(CONFIG.FCM_KEY);

var getToken = exports.getToken = function getToken(req, res, next) {
    var token = req.headers.authorization_cms || req.headers.authorization_app;
    if (req.headers.authorization_cms) {
        MODEL.User.findOne({ token: token }, function (err, user) {
            checkAuth(req, res, next, err, user);
        });
    } else if (req.headers.authorization_app) {
        MODEL.Device.findOne({ token: token }, function (err, device) {
            checkAuth(req, res, next, err, device);
        });
    } else {
        return res.json(isJsonErrorTemplate(CONFIG.CONSTANT.TOKEN_NOT_PROVIDED));
    }
};

var checkAuth = function checkAuth(req, res, next, err, data) {
    if (err) {
        return res.json({
            isSuccess: false,
            isTokenExpire: true,
            message: CONFIG.CONSTANT.TOKEN_ERROR
        });
    } else {
        if (!data) {
            return res.json({
                isSuccess: false,
                isTokenExpire: true,
                message: CONFIG.CONSTANT.DATA_NOT_FOUND
            });
        } else {
            req.infoToken = data;
            next();
        }
    }
};

var isJsonErrorTemplate = exports.isJsonErrorTemplate = function isJsonErrorTemplate(message) {
    return {
        isSuccess: false,
        message: message
    };
};

var isJsonSuccessTemplate = exports.isJsonSuccessTemplate = function isJsonSuccessTemplate(type, model) {
    var template = {
        isSuccess: true,
        urlPath: CONFIG.FULLPATH,
        results: model
    };

    if (type == CONFIG.FORMAT_TYPE.OBJECT) {
        template.message = CONFIG.CONSTANT.SAVE_SUCCESS;
    }

    return template;
};

var isDefaultTemplate = exports.isDefaultTemplate = function isDefaultTemplate(res, err, model) {
    if (err) return res.json(isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));
    return res.json(isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.ARRAY, model));
};

var isUpdateTokenFCM = exports.isUpdateTokenFCM = function isUpdateTokenFCM(req, res, schema) {
    schema.findByIdAndUpdate(req.infoToken._id, {
        $set: { token_fcm: req.body.token_fcm, updatedDate: new Date() }
    }, { upsert: false, new: true }, function (err, model) {
        isDefaultTemplate(res, err, model);
    });
};

var isSendMessage = exports.isSendMessage = function isSendMessage(res, message) {
    //callback style
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!");
            return res.json(isJsonErrorTemplate(CONFIG.CONSTANT.SEND_MSG_FAIL));
        } else {
            console.log("Successfully sent with response: ", response);
            return res.json({
                isSuccess: true,
                message: CONFIG.CONSTANT.SEND_MSG_SUCCESS
            });
        }
    });
};

var getRooms = exports.getRooms = function getRooms(res, data) {
    var path = 'chatRooms/' + data.siteId + '/' + data.deviceId + '/';
    if (data.siteId == CONFIG.SITE.HANDIGO) {
        path = 'chatRooms/' + data.siteId + '/' + data.infoSite.hotelId + '/' + data.deviceId + '/';
    }

    return path;
};