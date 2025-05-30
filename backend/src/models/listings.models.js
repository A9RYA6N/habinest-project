import mongoose from 'mongoose';
import listingsDB from '../db/listingsDB.js';

const listingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  
  address: {
    type: String,
    required: true
  },

  priceRange: {
    type: Number,
    required: true
  },
  
  sharingType: {
    type: String,
    required: true
  },
  
  photo: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ['Gents', 'Women', 'Coliving'],
    required: true
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // longitudes and latitudes
    },
  },

  ratings: [
    {
      user: {
        type: String,
        required: true
      },
      rating: { type: Number, min: 0, max: 5, required: true },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]

}, { timestamps: true });

listingsSchema.index({ location: '2dsphere' });

const db = await listingsDB();

export const Listings = db.model('Listings', listingsSchema, 'data');