import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

export const getRole = async userId => {
  const { role } = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return role;
};

export const getRootFolder = async userId => {
  const { folders, files } = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      files: { where: { parentId: null } },
      folders: { where: { parentId: null } },
    },
  });

  return folders.concat(files);
};

export const getFolder = async folderId => {
  const { subDirectories, files, parentId } = await prisma.folder.findUnique({
    where: { id: folderId },
    select: {
      subDirectories: { where: { parentId: folderId } },
      files: { where: { parentId: folderId } },
      parentId: true,
    },
  });

  return { files: subDirectories.concat(files), parentId };
};

export const createFolder = async (userId, name, parentId = null) => {
  await prisma.folder.create({
    data: {
      name: name,
      ownerId: userId,
      parentId: parentId,
    },
  });
};

export const deleteFolder = async folderId => {
  await prisma.folder.delete({
    where: { id: folderId },
  });
};

export const renameFolder = async (folderId, newName) => {
  const { parentId } = await prisma.folder.update({
    where: { id: folderId },
    data: { name: newName },
    select: { parentId: true },
  });

  return parentId;
};

export const uploadFile = async ({
  userId,
  name,
  size,
  url,
  parentId = null,
}) => {
  await prisma.file.create({
    data: {
      ownerId: userId,
      name,
      size,
      url,
      parentId,
    },
  });
};

export const deleteFile = async fileId => {
  await prisma.file.delete({
    where: { id: fileId },
  });
};

export const renameFile = async (fileId, newName) => {
  const { parentId } = await prisma.file.update({
    where: { id: fileId },
    data: { name: newName },
    select: { parentId: true },
  });

  return parentId;
};
