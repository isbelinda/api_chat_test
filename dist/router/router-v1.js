'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mainController = require('../controller/mainController');

var mainController = _interopRequireWildcard(_mainController);

var _userController = require('../controller/userController');

var userController = _interopRequireWildcard(_userController);

var _deviceController = require('../controller/deviceController');

var deviceController = _interopRequireWildcard(_deviceController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    res.send('I use router v1');
});

router.post('/User/Login', function (req, res) {
    userController.login(req, res);
});

router.post('/Device/Login', function (req, res) {
    deviceController.login(req, res);
});

router.post('/User/Create', function (req, res) {
    userController.create(req, res);
});

router.use(function (req, res, next) {
    mainController.getToken(req, res, next);
});

//// USER FOR CMS
router.get('/User/GetLists', function (req, res) {
    userController.lists(req, res);
});

router.post('/User/UpdateTokenMessage', function (req, res) {
    userController.updateTokenFCM(req, res);
});

router.post('/User/SendMessage', function (req, res) {
    userController.sendMessage(req, res);
});

//// DEVICE
router.post('/Device/UpdateTokenMessage', function (req, res) {
    deviceController.updateTokenFCM(req, res);
});

router.post('/Device/SendMessage', function (req, res) {
    deviceController.sendMessage(req, res);
});

exports.default = router;