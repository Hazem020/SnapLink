import express from 'express';
import * as authController from '../controllers/authController.js';
import Url from '../models/urlModel.js';
import AppError from '../utils/appError.js';
const viewRouter = express.Router();
// Homepage
viewRouter.get('/', authController.isLoggedIn, (req, res) => {
  res.render('index');
});

// Signup page
viewRouter.get('/signup', authController.isLoggedIn, (req, res) => {
  res.render('signup');
});

// Login page
viewRouter.get('/login', authController.isLoggedIn, (req, res) => {
  res.render('login');
});

// Dashboard
viewRouter.get('/me', authController.auth, (req, res) => {
  res.render('dashboard');
});
viewRouter.get('/error', (req, res) => {
  res.render('error');
});

// URL Statistics
viewRouter.get('/stats/:id', authController.auth, async (req, res) => {
  const url = await Url.findById(req.params.id);
  res.render('stats', { url: url });
});
viewRouter.get('/:shortUrl', authController.auth, async (req, res, next) => {
  const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  if (url == null) return next(new AppError('URL not found', 404));
  res.redirect(url.originalUrl);
});

export default viewRouter;
