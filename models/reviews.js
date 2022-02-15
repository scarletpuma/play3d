const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  videoGameTitle: {type: String},
  rate: {type: String},
  review: {type: String}
})

const reviewCollection = mongoose.model(`Review`, reviewSchema);

module.exports = reviewCollection;
