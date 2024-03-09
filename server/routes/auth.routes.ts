import {
    Router
} from "express";
import {
    UserController
} from "../controllers/userController.js";
import {
    check
} from "express-validator";
import authMiddleware from '../middleware/auth.middleware.js';

const router: Router = Router()

router.post('/register', UserController.registration)

router.post('/login', UserController.login)

router.get('/auth', authMiddleware, UserController.auth)

router.patch('/changeinfo', [check('email', 'Uncorrect email').isEmail()] , authMiddleware, UserController.changeInfo)

router.get('/activate/:link', UserController.activate)

router.get('/refresh', authMiddleware, UserController.refresh)

router.post('/logout', authMiddleware, UserController.logout)

export default router