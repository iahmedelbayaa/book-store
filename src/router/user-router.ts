import express from 'express';
import * as userCtrl from '../controller/user-controller';
const router = express.Router();

router.get('/users', userCtrl.getUserList);

router.post('/users/save', userCtrl.saveUser);


export default router;