'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hotel = exports.Device = exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

var _config = require('./config');

var CONFIG = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _mongoose2.default.connect(CONFIG.DB, CONFIG.OPTIONS_DB);
_mongooseAutoIncrement2.default.initialize(connection);
var Schema = _mongoose2.default.Schema;

/// USER ADMIN
var UserSchema = new Schema({
    'username': String,
    'password': String,
    'siteId': Number,
    'roleId': Number,
    'token': String,
    'token_fcm': String,
    'hotelId': Number,
    'hotelName': String,
    'createdDate': Date,
    'updatedDate': Date
});
UserSchema.plugin(_mongooseAutoIncrement2.default.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});
var User = exports.User = _mongoose2.default.model('User', UserSchema);

//// USER DEVICE
var DeviceSchema = new Schema({
    'username': String,
    'password': String,
    'serialNumber': String,
    'siteId': Number,
    'token': String,
    'token_fcm': String,
    'infoSite': {},
    'createdDate': Date,
    'updatedDate': Date
});
DeviceSchema.plugin(_mongooseAutoIncrement2.default.plugin, {
    model: 'Device',
    field: 'deviceId',
    startAt: 1,
    incrementBy: 1
});
var Device = exports.Device = _mongoose2.default.model('Device', DeviceSchema);

//// HOTEL FOR HANDIGO
var HotelSchema = new Schema({
    'hotelName': String,
    'createdDate': Date,
    'updatedDate': Date
});
HotelSchema.plugin(_mongooseAutoIncrement2.default.plugin, {
    model: 'Hotel',
    field: 'hotelId',
    startAt: 1,
    incrementBy: 1
});
var Hotel = exports.Hotel = _mongoose2.default.model('Hotel', HotelSchema);