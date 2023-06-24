const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  startLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
    },
  ],
  name: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  maxGroupSize: {
    type: Number,
    
  },
  difficulty: {
    type: String,
    
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    
  },
  summary: {
    type: String,
    
    trim: true
  },
  description: {
    type: String,
   
    trim: true
  },
  imageCover: {
    type: String,
  
  },
  images: [String],
  startDates: [Date],
  slug:String
});


const Tour = mongoose.model('myBooking', tourSchema);

module.exports = Tour;
