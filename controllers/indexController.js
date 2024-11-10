import * as db from '../prisma/prismaClient.js';

export const index = {
  getHome: (req, res) => {
    res.render('index');
  },

  getDashboard: async (req, res) => {
    const files = await db.getRootFolder(req.user.id);
    res.locals.files = files;
    res.render('dashboard');
  },

  getFolder: async (req, res) => {
    const { folderId } = req.params;
    const { files, parentId } = await db.getFolder(folderId);
    res.locals = {
      ...res.locals,
      currentFolderId: folderId,
      parentId,
      files,
    };
    res.render('dashboard');
  },
};
