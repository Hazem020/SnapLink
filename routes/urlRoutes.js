import express from 'express';
import * as urlController from '../controllers/urlController.js';
import * as authController from '../controllers/authController.js';
const urlRouter = express.Router();
urlRouter.post('/shorten', authController.auth, urlController.shortenUrl);
urlRouter.get('/me', authController.auth, urlController.getMyUrls);
urlRouter.get('/:shortUrl', urlController.getOriginalUrl);
urlRouter.get('/stats/:id', authController.auth, urlController.getStats);
urlRouter.delete('/:id', authController.auth, urlController.deleteUrl);
export default urlRouter;
