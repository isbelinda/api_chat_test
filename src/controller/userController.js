import uuid from 'node-uuid';
import * as MODEL from '../app/models';
import * as CONFIG from '../app/config';
import * as MAINCONTROLLER from '../controller/mainController';

export const login = (req, res) => {
    let infoRequest = {
        username: req.body.username
    };

    MODEL.User.findOne(infoRequest, (err, user) => {
        if(!user) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.USER_NOT_FOUND));
        if(user.password != req.body.password) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.WRONG_PASSWORD));
        let token = uuid.v1();
        
        MODEL.User.findOneAndUpdate({userId: user.userId},{
            $set: {token: token, updatedDate: new Date()}
        },
            {upsert: false, new: true},
            (err, model) => {
                MAINCONTROLLER.isDefaultTemplate(res, err, model);
        })
    })
};

export const lists = (req, res) => {
    MODEL.User.find((err, users) => {
        if(err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));
        return res.json(MAINCONTROLLER.isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.ARRAY, users));
    })
};

export const create = (req, res) => {
    let userRequest = req.body;
    userRequest.createdDate = new Date();
    userRequest.updatedDate = new Date();

    if(userRequest.roleId == CONFIG.ROLETYPE.ADMIN && userRequest.siteId == CONFIG.SITE.HANDIGO){
        if(!userRequest.hotelId) return res.json({ isSuccess: false });
    }

    MODEL.User.findOne({username: userRequest.username}, (err, user) => {
        if(user) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.USER_ALREADY));

        let userModel = new MODEL.User(userRequest);

        userModel.save((err, model) => {
            MAINCONTROLLER.isDefaultTemplate(res, err, model);
        });
    });
};

export const edit = (req, res) => {

};

export const remove = (req, res) => {
    
};

export const updateTokenFCM = (req, res) => {
    if(!req.body.token_fcm) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.TOKEN_NOT_PROVIDED));
    MAINCONTROLLER.isUpdateTokenFCM(req, res, MODEL.User);
};

export const sendMessage = (req, res) => {
    MODEL.Device.findOne({deviceId: req.body.deviceId}, (err, device) => {
        if(!device) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.DATA_NOT_FOUND));
        let receiveToken = device.token_fcm;
        let title = `New message from Admin`;

        let message = {
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
