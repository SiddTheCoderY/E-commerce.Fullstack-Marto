import mongoose from 'mongoose';

const feedTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  details: {
    searchedContent: {
      type: String,
      default: ''
    },
    filters : {
      category: {
        type: String,
        default: ''
      }, 
      priceRange: {
        type: Number,
        default: 0
      },
      rating: {
        type: Number,
        default: 0
      },
      sortBy: {
        type: String,
        default: ''
      },
    },
    page: {
      type: Number,
      default: 1
    },
  },
},{
  timestamps: true,
});

export const FeedTracker = mongoose.model('FeedTracker', feedTrackerSchema);
