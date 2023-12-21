import express from 'express';
const router = express.Router();
import * as loginCtrl from '../controller/login-controller';
import * as jwtUtil from '../util/jwtUtil';
import * as authentication from '../middelware/authentication'
import * as authoritiztion from '../middelware/authoritiztion';


router.get('/login/profile',authentication.verifyToken,authoritiztion.authorizeByRole("customer", "seller"), loginCtrl.getUserProfile);
router.post('/login', loginCtrl.signIn);



export default router;
