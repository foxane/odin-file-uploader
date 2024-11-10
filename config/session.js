import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from '../prisma/prismaClient.js';

export default {
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  secret: process.env.COOKIE_SECRET || 'SET THE GODDAMN COOKIE!',
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};
