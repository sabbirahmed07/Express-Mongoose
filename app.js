const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//models
const User = require("./models/user");

//creating an express app
const app = express();

//adding templating engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5d242a820433d510b4ba4924")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//using routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://sabbir:iutcse36@nodejs-gncgw.mongodb.net/shop?retryWrites=true&w=majority",
    { useNewUrlParser: true, useFindAndModify: false }
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Sabbir",
          email: "test@test.com",
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    console.log("Mongoose Connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));
