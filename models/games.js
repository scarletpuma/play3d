const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
  title: {type: 'string'},
  genre: {type: 'string'},
  releaseDate: {type: 'string'},
  company: {type: 'string'},
  msrbRating: {type: 'string'},
  description: {type: 'string'},
  tags: {type: 'string'},
  buyLink: {type: 'string'},
  image: {type: 'string'}
})

const gameCollection = mongoose.model(`Game`, gameSchema);

module.exports = gameCollection;
