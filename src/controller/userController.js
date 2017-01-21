import * as MODEL from '../app/models';
import * as CONFIG from '../app/config';
import * as MAINCONTROLLER from '../controller/mainController';

export const login = (req, res) => {
    MODEL.User.findOne({username: username, password: password}, (err, user) => {
        
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
