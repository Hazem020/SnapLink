import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  visitors: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Post hook to increment visitors count when a document is retrieved
urlSchema.post('findOne', function (doc) {
  if (doc) {
    doc.visitors++;
    doc.save();
  }
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
