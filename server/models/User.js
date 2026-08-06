import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  accountType: { type: String, enum: ['viewer', 'creator', 'both'], default: 'both' },
  creatorEnabled: { type: Boolean, default: false },
  avatar: { type: String, default: null },
  subscription: { type: String, enum: ['free', 'premium', 'vip'], default: 'free' },
  creatorTier: { type: String, enum: ['starter', 'rising', 'established', 'elite'], default: 'starter' },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  savedContent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  watchHistory: [{
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    watchedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
  }],
  preferences: {
    theme: { type: String, default: 'dark' },
    notifications: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    language: { type: String, default: 'en' },
  },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toPublicJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
