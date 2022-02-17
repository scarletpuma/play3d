const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  videoGameTitle: {type: String, required: true},
  author: {type: String, required: true},
  rate: {type: String, required: true},
  review: {type: String}
})

const reviewCollection = mongoose.model(`Review`, reviewSchema);

module.exports = reviewCollection;
