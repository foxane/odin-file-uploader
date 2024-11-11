import { Router } from 'express';
import { folder, file } from '../controllers/fileController.js';
import { index } from '../controllers/indexController.js';
import * as user from '../controllers/userController.js';
import { NotFoundError } from '../middlewares/error.js';
import { uploadMiddleware } from '../middlewares/storage.js';
import { loginValidator, signupValidator } from '../middlewares/validator.js';

const router = Router();

router.use((req, res, next) => {
  if (req.user) res.locals.user = req.user;
  next();
});

// User routes
router.get('/login', user.login.getForm);
router.get('/signup', user.signup.getForm);
router.get('/logout', user.logout.getLogout);
router.post('/login', loginValidator, user.login.postForm);
router.post('/signup', signupValidator, user.signup.postForm);

// Dashboard routes
router.get('/dashboard/:folderId', index.getFolder);
router.get('/dashboard', index.getDashboard);

// File routes
router.post('/rename-folder/:folderId', folder.renameFolder);
router.get('/delete-folder/:folderId', folder.deleteFolder);
router.post('/new-folder/:parentId', folder.createFolder);
router.post('/new-folder', folder.createFolder);

router.post('/rename-file/:fileId', file.renameFile);
router.get('/delete-file/:fileId', file.deleteFile);
router.post('/new-file/:parentId', uploadMiddleware, file.uploadFile);
router.post('/new-file', uploadMiddleware, file.uploadFile);

// Misc routes
router.get('/', index.getHome);

// 404 route for unknown paths
router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default router;
