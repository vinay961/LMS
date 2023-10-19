import {Router} from "express";
import { register, userinfo } from "../controller/user.controller.js";
const router = Router();


router.post('/createUser',register)
router.get('/userInfo',userinfo)

export default router