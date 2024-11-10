import { body } from 'express-validator';
import prisma from '../prisma/prismaClient.js';

export const auth = (req, res, next) => {
  if (!req.user) {
    // Janky asf
    res.locals.errors = [{ msg: 'You need to login first!' }];
    return res.render('login');
  }

  res.locals.user = req.user;
  next();
};

export const signupValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({ min: 4, max: 20 })
    .withMessage('Username must be between 4-10 character long')
    .custom(async val => {
      const user = await prisma.user.findUnique({
        where: {
          username: val,
        },
      });

      if (user) {
        throw new Error('Username already been taken');
      }

      return true;
    }),
  body('confirmPw')
    .custom((val, { req }) => val === req.body.password)
    .withMessage('Password did not match'),
];

export const loginValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({ min: 4, max: 10 })
    .withMessage('Username must be between 4-20 character long'),
  body('password').trim().notEmpty().withMessage('Password cannot be empty'),
];

export const folderValidator = [
  body('folderName')
    .trim()
    .notEmpty()
    .withMessage('Folder name cannot be empty'),
];
