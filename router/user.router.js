import {Router} from "express";
import {loginUser, logoutUser, register, userDetails} from "../controller/user.controller.js";
const router = Router();


router.post('/createUser',register)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/getinfo',userDetails)

export default router