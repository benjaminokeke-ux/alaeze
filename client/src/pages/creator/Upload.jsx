import { useState } from 'react';
import { FiUploadCloud, FiFilm, FiMusic, FiImage, FiRadio } from 'react-icons/fi';
import { CONTENT_TYPES, CONTENT_TYPE_LABELS } from '../../utils/constants';

export default function CreatorUpload() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    tags: '',
    visibility: 'public',
    scheduledDate: '',
    file: null,
    thumbnail: null,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      setStep(2);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-display font-bold mb-2">Upload Content</h1>
      <p className="text-dark-400 mb-8">Share your work with the Alaeze community</p>

      {/* Step 1: File Upload */}
      {step === 1 && (
        <div className="card p-8">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-dark-600 rounded-xl p-12 cursor-pointer hover:border-redd-500 transition-colors"
          >
            <FiUploadCloud size={48} className="text-dark-400 mb-4" />
            <p className="text-lg font-medium mb-2">Drop your file here</p>
            <p className="text-dark-400 text-sm mb-4">or click to browse</p>
            <div className="flex gap-4 text-dark-500">
              <span className="flex items-center gap-1 text-xs"><FiFilm size={14} /> Video</span>
              <span className="flex items-center gap-1 text-xs"><FiMusic size={14} /> Audio</span>
              <span className="flex items-center gap-1 text-xs"><FiImage size={14} /> Image</span>
              <span className="flex items-center gap-1 text-xs"><FiRadio size={14} /> Live</span>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="video/*,audio/*,image/*"
              onChange={handleFileSelect}
            />
          </label>
          <p className="text-dark-500 text-xs text-center mt-4">
            Max file size: 10GB. Supported: MP4, MOV, MP3, WAV, JPG, PNG, GIF
          </p>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && !uploading && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Preview */}
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-redd-600/10 rounded-lg flex items-center justify-center">
              <FiFilm size={24} className="text-redd-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{formData.file?.name}</p>
              <p className="text-dark-400 text-sm">
                {(formData.file?.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setStep(1); setFormData({ ...formData, file: null }); }}
              className="text-dark-400 hover:text-redd-400 text-sm"
            >
              Change
            </button>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Content Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(CONTENT_TYPE_LABELS).map(([type, label]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.type === type
                      ? 'bg-redd-600 text-white'
                      : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-300 mb-2">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Give your content a title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-dark-300 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field min-h-[120px] resize-y"
              placeholder="Tell viewers what this is about..."
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-dark-300 mb-2">Tags</label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              className="input-field"
              placeholder="Separate tags with commas"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Visibility</label>
            <div className="flex gap-3">
              {['public', 'subscribers', 'private'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setFormData({ ...formData, visibility: v })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    formData.visibility === v
                      ? 'bg-redd-600 text-white'
                      : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              Publish Now
            </button>
            <button type="button" className="btn-secondary">
              Schedule
            </button>
          </div>
        </form>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="card p-8 text-center">
          <div className="w-20 h-20 bg-redd-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUploadCloud size={32} className="text-redd-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {uploadProgress >= 100 ? 'Upload Complete! 🎉' : 'Uploading...'}
          </h3>
          <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-gradient-to-r from-redd-600 to-gold-500 rounded-full transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-dark-400 text-sm mt-2">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
}
