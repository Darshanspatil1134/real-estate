const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    address: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  type: { type: String, enum: ['Buy', 'Rent', 'Commercial', 'Luxury'], required: true },
  propertyType: { type: String, enum: ['Apartment', 'Villa', 'Plot', 'Office'], required: true },
  amenities: [String],
  beds: Number,
  baths: Number,
  sqft: Number,
  images: [String],
  video: String,
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['Available', 'Sold', 'Rented'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
