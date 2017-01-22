// export const FULLPATH = `http://localhost:3004/`;
export const FULLPATH = `https://apichat.herokuapp.com/`;
// export const DB = `mongodb://localhost:27017/livechat_server`;
export const DB = 'mongodb://belinda:060451105@ds159208.mlab.com:59208/apichat';
export const FCM_KEY = `AAAAiQwy1bI:APA91bFsiMmjaWhVj6-uWFFMTo-2_ra70fjn1Gyuufzi7F3HXIqWl6VMTvRKJuGV21M6O2MF60NpzXKBc0mlvLIcR5kK3RNU990KLKaCTUJMHqGsORtyM2C07A6YzEn1BqVwGWRAdHmlj5eja9JoIx3MB9VX7JBAFw`;

export const ROLETYPE = {
    SUPERADMIN: 1,
    ADMIN: 2
};

export const SITE = {
    HANDIGO: 1
};

export const CONSTANT = {
    SERVER_ERROR: 'Server Error.',
    DATA_NOT_FOUND: 'Data not found.',
    USER_NOT_FOUND: 'User not found.',
    USER_ALREADY: `This account has already exists.`,
    SAVE_SUCCESS: 'Save success.',
    WRONG_PASSWORD: 'Wrong Password.',
    TOKEN_ERROR: `Failed to authenticate token.`,
    TOKEN_NOT_PROVIDED: `No token provided`,
    DEVICE_NOT_FOUND: 'Device not found.',
    SEND_MSG_SUCCESS: 'Send message is success.',
    SEND_MSG_FAIL: 'Send message is fail.'
};

export const FORMAT_TYPE = {
    ARRAY: 1,
    OBJECT: 2
}