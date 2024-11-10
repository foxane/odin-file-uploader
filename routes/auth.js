import { Router } from 'express';
import { folder, file } from '../controllers/fileController.js';
import { index } from '../controllers/indexController.js';
import { upload } from '../config/multer.js';
import { NotFoundError } from '../middlewares/error.js';

const authRouter = Router();

authRouter.get('/dashboard/:folderId', index.getFolder);
authRouter.get('/dashboard', index.getDashboard);

// File routes
authRouter.post('/rename-folder/:folderId', folder.renameFolder);
authRouter.get('/delete-folder/:folderId', folder.deleteFolder);
authRouter.post('/new-folder/:parentId', folder.createFolder);
authRouter.post('/new-folder', folder.createFolder);

authRouter.post('/rename-file/:fileId', file.renameFile);
authRouter.get('/delete-file/:fileId', file.deleteFile);
authRouter.post('/new-file/:parentId', upload, file.uploadFile);
authRouter.post('/new-file', upload, file.uploadFile);

authRouter.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default authRouter;
