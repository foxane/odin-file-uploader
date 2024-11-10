import 'dotenv/config.js';
import express from 'express';
import session from 'express-session';
import path from 'node:path';

import sessionConfig from './config/session.js';
import passport from './config/passport.js';
import router from './routes/routes.js';
import authRouter from './routes/auth.js';
import { auth } from './middlewares/validator.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig));
app.use(passport.session());

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use('/', router);
app.use('/', auth, authRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening on', PORT);
});
