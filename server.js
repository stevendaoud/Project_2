require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      `
      Somebody once told me the world is gonna roll me
      I ain't the sharpest tool in the shed
      She was looking kind of dumb with her finger and her thumb
      In the shape of an "L" on her forehead

      Well the years start coming and they don't stop coming
      Fed to the rules and I hit the ground running
      Didn't make sense not to live for fun
      Your brain gets smart but your head gets dumb
      So much to do, so much to see
      So what's wrong with taking the back streets?
      You'll never know if you don't go
      You'll never shine if you don't glow

      Hey now, you're an all-star, get your game on, go play
      Hey now, you're a rock star, get the show on, get paid
      And all that glitters is gold
      Only shooting stars break the mold
      
      It's a cool place and they say it gets colder
      You're bundled up now, wait till you get older
      But the meteor men beg to differ
      Judging by the hole in the satellite picture
      The ice we skate is getting pretty thin
      The water's getting warm so you might as well swim
      My world's on fire, how about yours?
      That's the way I like it and I never get bored

      Hey now, you're an all-star, get your game on, go play
      Hey now, you're a rock star, get the show on, get paid
      All that glitters is gold
      Only shooting stars break the mold

      Hey now, you're an all-star, get your game on, go play
      Hey now, you're a rock star, get the show, on get paid
      And all that glitters is gold
      Only shooting stars

      Somebody once asked could I spare some change for gas?
      I need to get myself away from this place
      I said yep what a concept
      I could use a little fuel myself
      And we could all use a little change

      Well, the years start coming and they don't stop coming
      Fed to the rules and I hit the ground running
      Didn't make sense not to live for fun
      Your brain gets smart but your head gets dumb

      So much to do, so much to see
      So what's wrong with taking the back streets?
      You'll never know if you don't go (go!)
      You'll never shine if you don't glow
      
      Hey now, you're an all-star, get your game on, go play
      Hey now, you're a rock star, get the show on, get paid
      And all that glitters is gold
      Only shooting stars break the mold
      And all that glitters is gold
      Only shooting stars break the mold
      
      And we're listening on PORT: ${PORT}`
    );
  });
});

module.exports = app;
