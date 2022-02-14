const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
  title: {type: String},
  genre: [{type: String}],
  releaseDate: {type: String},
  developer: {type: String},
  msrbRating: {type: String},
  description: {type: String},
  tags: [{type: String}],
  buyLink: {type: String},
  image: {type: String}
})

const gameCollection = mongoose.model(`Game`, gameSchema);

module.exports = gameCollection;
