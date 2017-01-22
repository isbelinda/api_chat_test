'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FULLPATH = exports.FULLPATH = 'http://localhost:3004/';
var DB = exports.DB = 'mongodb://localhost:27017/livechat_server';
var FCM_KEY = exports.FCM_KEY = 'AAAAiQwy1bI:APA91bFsiMmjaWhVj6-uWFFMTo-2_ra70fjn1Gyuufzi7F3HXIqWl6VMTvRKJuGV21M6O2MF60NpzXKBc0mlvLIcR5kK3RNU990KLKaCTUJMHqGsORtyM2C07A6YzEn1BqVwGWRAdHmlj5eja9JoIx3MB9VX7JBAFw';

var ROLETYPE = exports.ROLETYPE = {
    SUPERADMIN: 1,
    ADMIN: 2
};

var SITE = exports.SITE = {
    HANDIGO: 1
};

var CONSTANT = exports.CONSTANT = {
    SERVER_ERROR: 'Server Error.',
    DATA_NOT_FOUND: 'Data not found.',
    USER_NOT_FOUND: 'User not found.',
    USER_ALREADY: 'This account has already exists.',
    SAVE_SUCCESS: 'Save success.',
    WRONG_PASSWORD: 'Wrong Password.',
    TOKEN_ERROR: 'Failed to authenticate token.',
    TOKEN_NOT_PROVIDED: 'No token provided',
    DEVICE_NOT_FOUND: 'Device not found.',
    SEND_MSG_SUCCESS: 'Send message is success.',
    SEND_MSG_FAIL: 'Send message is fail.'
};

var FORMAT_TYPE = exports.FORMAT_TYPE = {
    ARRAY: 1,
    OBJECT: 2
};