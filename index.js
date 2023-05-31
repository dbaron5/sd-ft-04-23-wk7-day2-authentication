const express = require("express");
const app = express();
const port = 3005;
const { User } = require("./models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Middleware
app.use(express.json());
// Intercepting a route, before you hit the request and response.
passport.use(
    new LocalStrategy((email,password,done)) => {
        const userToFind = await User.findOne({
      where: {
        email: email,
      },
            });
            const passwordMatch = await bcrypt.compare(password, userToFind.password);
            if(passwordMatch){
                return done(null, userToFind);
            } else {
                return done(null,false, {message: "email or password did not match, please try again",});
            }
            })
            );

function authenticate(req, res, next) {
  if (req.body.name === "Joe") {
    next();
  } else {
    res.status(400).send("No");
  }
}

app.post("/sign_up", async (req, res) => {
});
  app.post("/login", async (req, res) => {
    // we need to accept a email and a password
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send("Please include an email");
      return;
    }
    if (!password) {
      res.status(400).send("Please include an password");
      return;
    }
    // find the user by email
    const userToFind = await User.findOne({
      where: {
        email: email,
      },
    });
    // compare the user password that is coming in
    // to the user password that we found in the database on line 49
    // this returns true if it matches, false if it doesn't
    
    if (!passwordMatch) {
      res.status(403).send("That is the wrong password, try again");
      return;
    }
    // this is where we start the passport session
    res.send(passwordMatch);
  });

  // hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    console.log(hash);
  });

  // const userToCreate = { email: email, password: password };
  // const newUser = await User.create(userToCreate);
  res.json({ message: `User successfully created with ID ${newUser.id}` });
});

app.post("/", authenticate, (req, res) => {
  res.json({ message: "Login successful" });
});

app.post("/login", (req, res) => {
  res.json({ message: "Login successful" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
