import express from 'express';
const router = express.Router();

import * as mainController from '../controller/mainController';
import * as userController from '../controller/userController';

router.get('/', (req, res) => {
    res.send('I use router v1');
});

router.post('/User/Login', (req, res) => {
    userController.login(req, res);
});

router.use((req, res, next) => {
    mainController.getToken(req, res, next);
});

router.get('/User/GetLists', (req, res) => {
    userController.lists(req, res);
});

router.post('/User/Create', (req, res) => {
    userController.create(req, res);
});

export default router;