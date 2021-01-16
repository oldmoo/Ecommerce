const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userMiddleware = require("./middlewares/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userMiddleware);

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://oldmo:PylHNqMu2OJ1z5Tb@clusterblog.jed7k.mongodb.net/shop-tuts?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("connected!");
    User.find().then((user) => {
      if (!user) {
        User.create({ name: "oldmo", email: "oldmo@gmail.com" })
          .then((user) => console.log(user))
          .catch((err) => console.log(err));
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
