import uuid from 'node-uuid';
import * as MODEL from '../app/models';
import * as CONFIG from '../app/config';
import * as MAINCONTROLLER from '../controller/mainController';

export const login = (req, res) => {
    let infoRequest = {username: req.body.username, password: req.body.password};
    if(req.body.siteId == CONFIG.SITE.HANDIGO){
        // if(!req.body.serialNumber) return
        infoRequest = { serialNumber: req.body.serialNumber}
    }
    console.log(infoRequest);
    MODEL.Device.findOne(infoRequest, (err, device) => {
        if(err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));

        if(!device){
            create(req, res);
        } else {
            MODEL.Device.findOneAndUpdate({deviceId: device.deviceId},{
                    $set: {token: uuid.v1(), updatedDate: new Date(), infoSite: req.body.infoSite}
                },
                {upsert: false, new: true},
                (err, model) => {
                    MAINCONTROLLER.isDefaultTemplate(res, err, model);
                })    
        }
    });
};

const create = (req, res) => {
    req.body.createdDate = new Date();
    req.body.updatedDate = new Date();
    req.body.token = uuid.v1();
    let deviceModel = new MODEL.Device(req.body);
    
    deviceModel.save((err, model) => {
        MAINCONTROLLER.isDefaultTemplate(res, err, model);
    });
};

export const updateTokenFCM = (req, res) => {
    if(!req.body.token_fcm) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.TOKEN_NOT_PROVIDED));
    MAINCONTROLLER.isUpdateTokenFCM(req, res, MODEL.Device);
};

export const sendMessage = (req, res) => {
    MODEL.User.findOne({ siteId: req.infoToken.siteId}, (err, user) => {
        if(!user) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.DATA_NOT_FOUND));
        // let receiveToken = `d4ol-GDihLw:APA91bG0mjbmZmXrpg0p6sBhXvs5CEKittshNvg3vXnJ7FVh4ZdYKoqkRQiM-X6yr_PQrxVGVG9XTzqgX_vr-pg6Bq_2OVn6Mm5xa2H6b1HDOvh7K1Z6avSDf_k5XnWqhjB0W5g99zHX`;
        let receiveToken = user.token_fcm;
        let chatRoomPath = `http://localhost:5000/#!/chatRooms/chat/${req.infoToken.deviceId}`;
        let title = req.infoToken.username;

        if(req.infoToken.siteId == CONFIG.SITE.HANDIGO){
            title = `${ req.infoToken.infoSite.hotelName } No.${ req.infoToken.infoSite.room }`
        }

        let message = {
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

