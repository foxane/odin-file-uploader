import { InternalServerError } from '../middlewares/error.js';
import * as db from '../prisma/prismaClient.js';

export const folder = {
  createFolder: async (req, res, next) => {
    try {
      const parentId = req.params.parentId || null;
      await db.createFolder(req.user.id, req.body.folderName, parentId);

      if (parentId) {
        res.redirect(`/dashboard/${parentId}`);
      } else {
        res.redirect(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },

  deleteFolder: async (req, res, next) => {
    try {
      const parentId = req.query.parentId || '';
      const { folderId } = req.params;
      await db.deleteFolder(folderId);
      res.redirect(`/dashboard/${parentId}`);
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },

  renameFolder: async (req, res, next) => {
    try {
      const { folderId } = req.params;
      const parentId = await db.renameFolder(folderId, req.body.newName);
      res.redirect(`/dashboard/${parentId ?? ''}`);
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },
};

export const file = {
  uploadFile: async (req, res, next) => {
    try {
      if (!req.file) {
        return next(new InternalServerError());
      }

      const parentId = req.params.parentId || null;
      const { originalname, size, path } = req.file;
      await db.uploadFile({
        userId: req.user.id,
        name: originalname,
        url: path,
        size,
        parentId,
      });

      res.redirect(`/dashboard/${parentId ?? ''}`);
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },

  deleteFile: async (req, res, next) => {
    try {
      const { fileId } = req.params;
      const parentId = req.query.parentId || '';
      await db.deleteFile(fileId);
      res.redirect(`/dashboard/${parentId}`);
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },

  renameFile: async (req, res, next) => {
    try {
      const { fileId } = req.params;
      const parentId = await db.renameFile(fileId, req.body.newName);
      res.redirect(`/dashboard/${parentId ?? ''}`);
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },
};
