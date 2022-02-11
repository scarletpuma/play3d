////// ***Dependencies*** //////

const express = require(`express`);
const methodOverride  = require(`method-override`);
const mongoose = require (`mongoose`);
const app = express();
const db = mongoose.connection;
require(`dotenv`).config();
const Game = require(`./models/games.js`);
const gameSeed = require(`./models/test.js`);

////// ***port*** //////
const PORT = process.env.PORT || 3003;

////// ***database*** //////
const MONGODB_URI = process.env.MONGODB_URI;

////// ***connect to mongo*** //////
mongoose.connect(MONGODB_URI);

////// ***err*** //////
db.on(`error`, (err) => console.log(err.message + ` is Mongod not running?`));
db.on(`connected`, () => console.log(`mongo connected: `, MONGODB_URI));
db.on(`disconnected`, () => console.log(`mongo disconnected`));

app.use(express.static(`public`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride(`_method`));

////// ***routes*** //////
app.get(`/seed`, (req, res) => {
  Game.create(gameSeed, (err, resetGame) => {
    res.redirect(`/`)
  })
})
////// ***index*** //////
app.get(`/`, (req, res) => {
  Game.find({}, (err, allGames) => {
    res.render(`index.ejs`, {
      games: allGames
    });
  });
});

////// ***post*** //////
////// ***show*** //////

app.get(`/games/:id`, (req, res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render(`show.ejs`, {
      game: foundGame
    });
  });
});

////// ***listener*** //////
app.listen(PORT, () => console.log( `Listening on port:`, PORT));
