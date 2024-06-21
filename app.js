import express from 'express';
import morgan from 'morgan';
import path from 'path';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitze from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import userRouter from './routes/userRoutes.js';
import urlRouter from './routes/urlRoutes.js';
import viewRouter from './routes/viewRoutes.js';
const app = express();
app.set('trust proxy', 2);

// 1) MIDDLEWARES
app.use(cors());
app.options('*', cors());

const __dirname = path.resolve();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit request from user
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//data sanitization against NoSQL query injection
app.use(mongoSanitze());

//data sanitization against XSS
app.use(xss());

// //prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//     ],
//   })
// );

//read data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/urls', urlRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
