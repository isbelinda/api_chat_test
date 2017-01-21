import * as CONFIG from '../app/config';
import * as MODEL from '../app/models';

export const getToken = (req, res, next) => {
    // console.log(req.headers.authorization_cms);
    let token = req.headers.authorization_cms || req.headers.authorization_app
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
