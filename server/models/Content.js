import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  type: {
    type: String,
    enum: ['docuseries', 'movie', 'mini-series', 'vertical-drama', 'reel', 'podcast', 'visual-art', 'live-stream'],
    required: true,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mediaUrl: { type: String, default: null },
  thumbnail: { type: String, default: null },
  duration: { type: Number, default: 0 }, // in minutes
  tags: [{ type: String }],
  visibility: { type: String, enum: ['public', 'subscribers', 'private'], default: 'public' },
  status: { type: String, enum: ['draft', 'processing', 'published', 'scheduled'], default: 'draft' },
  scheduledDate: { type: Date, default: null },
  // Analytics
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  totalWatchTime: { type: Number, default: 0 }, // in seconds
  avgDwellTime: { type: Number, default: 0 }, // in seconds
  // Series support
  series: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', default: null },
  episodeNumber: { type: Number, default: null },
  seasonNumber: { type: Number, default: null },
}, { timestamps: true });

contentSchema.index({ creator: 1, createdAt: -1 });
contentSchema.index({ type: 1, status: 1 });
contentSchema.index({ tags: 1 });

export default mongoose.model('Content', contentSchema);
