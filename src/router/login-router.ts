import express from 'express';
const router = express.Router();
import * as loginCtrl from '../controller/login-controller';
import * as jwtUtil from '../util/jwtUtil';


router.post('/login/profile/:id',jwtUtil.verifyToken , loginCtrl.getUserProfile);
router.post('/login/signIn', loginCtrl.signIn);



export default router;
