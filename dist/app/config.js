'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// export const FULLPATH = `http://localhost:3004/`;
var FULLPATH = exports.FULLPATH = 'https://livechatapi.handigothailand.com/';
// export const DB = `mongodb://localhost:27017/livechat_server`;
var DB = exports.DB = 'mongodb://localhost:27017/livechat_server_production';
// export const DB = 'mongodb://belinda:060451105@ds159208.mlab.com:59208/apichat';
var FCM_KEY = exports.FCM_KEY = 'AAAAdkbPARY:APA91bHal9yJxpIIrs0XJ-Bpa_GkI1nnkZVebsFiVJAVELKlGykNS8VECdakw9QlL8fDrGMD2kpWa3uEI1J-nS3LM-qrksN9vUgtGU01Pk5DHRRaWA-89SNdC9ztxpBB_mGP6Sg1YVOb';

var ROLETYPE = exports.ROLETYPE = {
    SUPERADMIN: 1,
    ADMIN: 2
};

var SITE = exports.SITE = {
    HANDIGO: 1,
    HANDIGO_TEST: 101,
    NAVIGO: 2
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
    SEND_MSG_FAIL: 'Send message is fail.',
    SERIAL_NUMBER_NOT_SEND: 'Please send serial number device.'
};

var FORMAT_TYPE = exports.FORMAT_TYPE = {
    ARRAY: 1,
    OBJECT: 2
};