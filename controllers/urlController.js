import URL from '../models/urlModel.js';
import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
// Helper function to create a short URL
const createShortUrl = async () => {
  const shortUrl = nanoid(8);
  if (await URL.findOne({ shortUrl })) {
    createShortUrl();
  }
  return shortUrl;
};

// @desc    Create a new short URL
// @route   POST /api/v1/urls/shorten
// @access  Private
export const shortenUrl = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json('Please login to create a short URL');
  }
  const { OriginalUrl } = req.body;
  // Check long url
  if (!validUrl.isUri(OriginalUrl)) {
    return res.status(401).json('Invalid base URL');
  }
  try {
    const shortUrl = await createShortUrl();
    const newUrl = await URL.create({
      originalUrl: OriginalUrl,
      shortUrl: shortUrl,
      user: user.id,
    });
    res.status(201).json({
      message: 'URL created successfully',
      data: newUrl,
    });
  } catch (err) {
    return new AppError('somthing went wrong', 500);
  }
});

// @desc    Get all short URLs created by a user
// @route   GET /api/v1/urls/me
// @access  Private
export const getMyUrls = async (req, res) => {
  if (!req.user) {
    return res.status(401).json('Please login to view your URLs');
  }
  try {
    const urls = await URL.find({ user: req.user.id });
    res.status(200).json({
      message: 'Success',
      urls: urls,
    });
  } catch (err) {
    return new AppError(err, 500);
  }
};

// @desc    Get original URL from short URL
// @route   GET /api/v1/urls/:shortUrl
// @access  Public
export const getOriginalUrl = async (req, res) => {
  try {
    const url = await URL.findOne({ shortUrl: req.params.shortUrl });
    if (!url) {
      return res.status(404).json('No URL found');
    }
    res.status(200).json({
      message: 'Success',
      data: url,
    });
  } catch (err) {
    return new AppError(err, 500);
  }
};

// @desc    Delete a short URL
// @route   DELETE /api/v1/urls/:id
// @access  Private
export const deleteUrl = async (req, res) => {
  try {
    const url = await URL.findById(req.params.id);
    if (!url) {
      return res.status(404).json('No URL found');
    }
    if (url.user.toString() !== req.user.id) {
      return res.status(401).json('Not authorized');
    }
    await url.deleteOne();
    res.status(200).json({
      message: 'URL deleted successfully',
    });
  } catch (err) {
    return new AppError(err, 500);
  }
};

// @desc    Get short URL analytics
// @route   GET /api/v1/urls/stats/:id
// @access  Private
export const getStats = async (req, res) => {
  try {
    const url = await URL.findById(req.params.id);
    if (!url) {
      return res.status(404).json('No URL found');
    }
    if (url.user.toString() !== req.user.id) {
      return res.status(401).json('Not authorized');
    }
    res.json({
      message: 'Success',
      data: url.visitors,
    });
  } catch (err) {
    return new AppError(err, 500);
  }
};
