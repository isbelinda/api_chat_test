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
        let dataRequest = {
            userId: user.userId
        }
        let dataSet = {
            token: token, 
            updatedDate: new Date()
        }

        MODEL.User.findOneAndUpdate({userId: user.userId},{
            $set: {token: token, updatedDate: new Date()}
        },
            {upsert: false, new: true},
            (err, model) => {
            getUserWithJson(res, model)
        })
    })
};

export const lists = (req, res) => {
    MODEL.User.find((err, users) => {
        if(err) return res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR));
        return res.json(MAINCONTROLLER.isJsonSuccessTemplate(CONFIG.FORMAT_TYPE.ARRAY, users));
    })
};

export const getUser = (req, res) => {
    let data = {
        tokenHash: req.query.token
    }

    MODEL.User.findOne(data, (err, model) => {
        getUserWithJson(res, model)
    })
}

export const listsBySiteId = (req, res) => {
      
};

export const create = (req, res) => {
    let userRequest = req.body;
    userRequest.createdDate = new Date();
    userRequest.updatedDate = new Date();
    userRequest.tokenHash = Date.now();

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
    let data = {
        tokenHash: Date.now(),
        username: req.body.username,
        password: req.body.password
    }

    MODEL.User.findOneAndUpdate({ userId: req.body.userId }, { $set: data }, { new: true }, (err, user) => {
        MAINCONTROLLER.isDefaultTemplate(res, err, user);
    })
};

export const remove = (req, res) => {
    MODEL.User.findOneAndRemove({ userId: req.body.userId}, (err, model) => {
        return err? res.json(MAINCONTROLLER.isJsonErrorTemplate(CONFIG.CONSTANT.SERVER_ERROR)) :  res.json({
            isSuccess: true,
            message: CONFIG.CONSTANT.DELETE_USER_SUCCESS
        })
        //MAINCONTROLLER.isDefaultTemplate(res, err, model);
    })
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

const getUserWithJson = (res, model) => {
    if(!model) return res.json(MAINCONTROLLER.isJsonErrorTemplate('Data not found.'));
    let path;
    switch(model.siteId) {
        case CONFIG.SITE.NEW_HANDIGO:
            if(model.roleId == CONFIG.ROLETYPE.ADMIN){
                path = `hotel_id:${model.hotelId}/chat_list/`
            }                    
        break

        default: 
        if(model.roleId == CONFIG.ROLETYPE.ADMIN){
                path = `chatRooms/${model.siteId}/`;
            if(model.siteId == CONFIG.SITE.HANDIGO || model.siteId == CONFIG.SITE.HANDIGO_TEST){
                path = `chatRooms/${model.siteId}/${model.hotelId}/`;
            }                    
        }
        break
    }

    return res.json({
        isSuccess: true,
        urlPath: CONFIG.FULLPATH,
        roomPath: path,
        results: model
    });
}
