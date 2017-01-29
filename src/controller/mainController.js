import * as CONFIG from '../app/config';
import * as MODEL from '../app/models';
import FCM from 'fcm-push';
const fcm = new FCM(CONFIG.FCM_KEY);

export const getToken = (req, res, next) => {
    let token = req.headers.authorization_cms || req.headers.authorization_app;
    if(req.headers.authorization_cms){
        MODEL.User.findOne({token: token}, (err, user) => {
            checkAuth(req, res, next, err, user);
        });
    } else if(req.headers.authorization_app){
        MODEL.Device.findOne({token: token}, (err, device) => {
            checkAuth(req, res, next, err, device);
        })
    } else {
        return res.json(isJsonErrorTemplate(CONFIG.CONSTANT.TOKEN_NOT_PROVIDED));
    }
};

const checkAuth = (req, res, next, err, data) => {
    if(err){
        return res.json({
            isSuccess: false,
            isTokenExpire: true,
            message: CONFIG.CONSTANT.TOKEN_ERROR
        });
    } else {
        if(!data){
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

export const isJsonErrorTemplate = (message) => {
    return {
        isSuccess: false,
        message: message
    }
};

export const isJsonSuccessTemplate = (type, model) => {
    let template = {
        isSuccess: true,
        urlPath: CONFIG.FULLPATH,
        results: model
    };

    if( type == CONFIG.FORMAT_TYPE.OBJECT ){
        template.message = CONFIG.CONSTANT.SAVE_SUCCESS
    }
    
    return template;
};

export const isDefaultTemplate = (res, err, model) => {
    if(err) return res.json(isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));
    return res.json(isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.ARRAY, model));
};

export const isUpdateTokenFCM = (req, res, schema) => {
    schema.findByIdAndUpdate(req.infoToken._id,{
            $set: {token_fcm: req.body.token_fcm, updatedDate: new Date()}
        },
        {upsert: false, new: true},
        (err, model) => {
            // console.log(model);
            if(!model) return res.json(isJsonErrorTemplate(CONFIG.CONSTANT.DATA_NOT_FOUND));
            isDefaultTemplate(res, err, model);
        })
};

export const isSendMessage = (res, message) => {
    //callback style
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
            return res.json(isJsonErrorTemplate(err));
        } else {
            console.log("Successfully sent with response: ", response);
            return res.json({
                isSuccess: true,
                message: CONFIG.CONSTANT.SEND_MSG_SUCCESS
            })
        }
    });
};

export const getRooms = (res, data) => {
    let path = `chatRooms/${data.siteId}/${data.deviceId}/`;
    if(data.siteId == CONFIG.SITE.HANDIGO){
        path = `chatRooms/${data.siteId}/${data.infoSite.hotelId}/${data.deviceId}/`;
    }

    return path;
};
