import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/prismaClient.js';
import passport from '../config/passport.js';

export const login = {
  getForm: (req, res) => {
    res.render('login');
  },
  postForm: (req, res, next) => {
    console.log('reached cibtrikker');
    const validRes = validationResult(req);
    if (!validRes.isEmpty()) {
      res.locals.errors = validRes.errors;
      return res.render('login');
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      // Show error message
      if (!user) {
        res.locals.errors = [info] || ['Authentication failed!'];
        return res.render('login');
      }

      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        res.locals.message = 'Logged in successfully!';
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  },
};

export const signup = {
  getForm: (req, res) => {
    res.render('signup');
  },
  postForm: async (req, res, next) => {
    const validRes = validationResult(req);
    if (!validRes.isEmpty()) {
      res.locals.errors = validRes.errors;
      return res.render('signup');
    }

    try {
      const pwHash = await bcrypt.hash(req.body.password, 10);
      await prisma.user.create({
        data: {
          username: req.body.username,
          passwordHash: pwHash,
        },
      });
      res.locals.message = 'Account created successfully';
      res.render('login');
    } catch (error) {
      console.error(error);
      next(new Error('Internal server error'));
    }
  },
};

export const logout = {
  getLogout: (req, res) => {
    req.logout(err => {
      if (err) {
        console.error(err);
        next(new Error('Internal server error'));
      }
      res.locals.user = null;
      res.locals.message = 'Successfully logged out!';
      res.render('login');
    });
  },
};
