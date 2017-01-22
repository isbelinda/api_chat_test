import express from 'express';
const router = express.Router();

import * as mainController from '../controller/mainController';
import * as userController from '../controller/userController';
import * as deviceController from '../controller/deviceController';

router.get('/', (req, res) => {
    res.send('I use router v1');
});

router.post('/User/Login', (req, res) => {
    userController.login(req, res);
});

router.post('/Device/Login', (req, res) => {
    deviceController.login(req, res);
});

router.use((req, res, next) => {
    mainController.getToken(req, res, next);
});


//// USER FOR CMS
router.get('/User/GetLists', (req, res) => {
    userController.lists(req, res);
});

router.post('/User/Create', (req, res) => {
    userController.create(req, res);
});

router.post('/User/UpdateTokenMessage', (req, res) => {
    userController.updateTokenFCM(req, res);
});

router.post('/User/SendMessage', (req, res) => {
    userController.sendMessage(req, res);
});


//// DEVICE
router.post('/Device/UpdateTokenMessage', (req, res) => {
    deviceController.updateTokenFCM(req, res);
});

router.post('/Device/SendMessage', (req, res) => {
    deviceController.sendMessage(req, res);
});




export default router;