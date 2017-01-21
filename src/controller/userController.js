import uuid from 'node-uuid';
import * as MODEL from '../app/models';
import * as CONFIG from '../app/config';
import * as MAINCONTROLLER from '../controller/mainController';

export const login = (req, res) => {
    MODEL.User.findOne({username: req.body.username}, (err, user) => {
        if(user.password != req.body.password) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.WRONG_PASSWORD));
        let token = uuid.v1();
        
        MODEL.User.findOneAndUpdate({userId: user.userId},{
            $set: {token: token, updatedDate: new Date()}
        },
            {upsert: false, new: true},
            (err, model) => {
                if(err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));
                return res.json(MAINCONTROLLER.isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.OBJECT, model));
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
            if(err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));

            return res.json(MAINCONTROLLER.isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.OBJECT, model));
        });
    });
};

export const edit = (req, res) => {

};

export const updateTokenFCM = (req, res) => {
    MODEL.User.findOne({token: req.headers.Authorization_cms}, (err, user) => {
        if(!user) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.USER_NOT_FOUND));
        
        MODEL.User.findOneAndUpdate({userId: user.userId},{
                $set: {token_fcm: token, updatedDate: new Date()}
            },
            {upsert: false, new: true},
            (err, model) => {
                if(err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));
                return res.json(MAINCONTROLLER.isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.OBJECT, model));
            })
    })
};
