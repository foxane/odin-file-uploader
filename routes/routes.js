import { Router } from 'express';
import * as user from '../controllers/userController.js';
import { index } from '../controllers/indexController.js';
import { loginValidator, signupValidator } from '../middlewares/validator.js';

const router = Router();

// User routes
router.get('/login', user.login.getForm);
router.get('/signup', user.signup.getForm);
router.get('/logout', user.logout.getLogout);
router.post('/login', loginValidator, user.login.postForm);
router.post('/signup', signupValidator, user.signup.postForm);

// Misc routes
router.get('/', index.getHome);

export default router;
