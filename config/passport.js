import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/prismaClient.js';

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          return done(null, false, { message: 'Username not found' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          return done(null, false, { message: 'Password incorrect' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export default passport;
