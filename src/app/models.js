import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import * as CONFIG from './config';

const connection = mongoose.connect(CONFIG.DB);
autoIncrement.initialize(connection);
const Schema   = mongoose.Schema;


/// USER ADMIN
const UserSchema = new Schema({
    'username' : String,
    'password' : String,
    'siteId' : Number,
    'roleId' : Number,
    'token' : String,
    'token_fcm' : String,
    'hotelId' : Number,
    'hotelName' : String,
    'createdDate' : Date,
    'updatedDate' : Date
});
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});
export const User = mongoose.model('User', UserSchema);


//// USER DEVICE
const DeviceSchema = new Schema({
    'username' : String,
    'password' : String,
    'siteId' : Number,
    'token' : String,
    'token_fcm' : String,
    'infoSite' : {},
    'createdDate' : Date,
    'updatedDate' : Date
});
DeviceSchema.plugin(autoIncrement.plugin, {
    model: 'Device',
    field: 'deviceId',
    startAt: 1,
    incrementBy: 1
});
export const Device = mongoose.model('Device', DeviceSchema);


//// HOTEL FOR HANDIGO
const HotelSchema = new Schema({
    'hotelName' : String,
    'createdDate' : Date,
    'updatedDate' : Date
});
HotelSchema.plugin(autoIncrement.plugin, {
    model: 'Hotel',
    field: 'hotelId',
    startAt: 1,
    incrementBy: 1
});
export const Hotel = mongoose.model('Hotel', HotelSchema);
