////// ***Dependencies*** //////
const express = require(`express`);
const methodOverride  = require(`method-override`);
const mongoose = require (`mongoose`);
const app = express();
const db = mongoose.connection;
require(`dotenv`).config();
const Game = require(`./models/games.js`);
const gameSeed = require(`./models/test.js`);
const Review = require(`./models/reviews.js`);

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
// app.get(`/seed`, (req, res) => {
//   Game.create(gameSeed, (err, resetGames) => {
//     console.log(resetGames);
//     console.log(err);
//     res.redirect(`/`)
//   })
// })

////// ***index*** //////
app.get(`/`, (req, res) => {
  Review.find({}, (err, allReviews) => {
      Game.find({}, (err, allGames) => {
          res.render(`index.ejs`, {
            games: allGames,
            reviews: allReviews
          });
      });
  });
});

////// ***edit*** //////
//darwood saved my life here
app.get(`/:id/edit`, (req, res) => {
    Review.findById(req.params.id, (err, foundReview) => {
        Game.find({}, (err, allGames) => {
            res.render(`edit.ejs`, {
              games: allGames,
              review: foundReview
            });
        });
    });
});

app.put(`/:id`, (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
    res.redirect(`/`)
  });
});


////// ***post*** //////
app.get(`/newpost`, (req, res) => {
  Game.find({}, (err, allGames) => {
    res.render(`post.ejs`, {
      games: allGames
    });
  });
});

app.post('/', (req, res) => {
  console.log(`hello`);
    Review.create(req.body, (err, createdReview) => {
      res.redirect(`/`)
    });
});

////// ***discover*** //////
app.get(`/discover`, (req, res) => {
  Game.find({}, (err, allGames) => {
    res.render(`discover.ejs`, {
      games: allGames
    });
  });
});

////// ***show*** //////
app.get(`/games/:id`, (req, res) => {
  Game.findById(req.params.id, (err, foundGame) => {
    res.render(`show.ejs`, {
      game: foundGame
    });
  });
});

////// ***delete*** //////
app.delete(`/games/:id`, (req, res) => {
  Review.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect(`/`)
  });
});
////// ***profile*** //////
app.get(`/profile`, (req, res) => {
  Review.find({}, (err, allReviews) => {
      Game.find({}, (err, allGames) => {
          res.render(`profile.ejs`, {
            games: allGames,
            reviews: allReviews
          });
      });
  });
});
////// ***lists*** //////
app.get(`/lists`, (req, res) => {
  Review.find({}, (err, allReviews) => {
      Game.find({}, (err, allGames) => {
          res.render(`lists.ejs`, {
            games: allGames,
            reviews: allReviews
          });
      });
  });
});
////// ***listener*** //////
app.listen(PORT, () => console.log( `Listening on port:`, PORT));
