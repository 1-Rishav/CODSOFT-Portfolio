//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import _ from "lodash";

const homeStartingContent =
"Welcome to my corner of the internet! I'm Rishav Raj, a passionate and driven Web-Developer and Programmer. With a blend of creativity and expertise, I strive to be a professional Web-Developer and master in DSA , craft visually stunning designs that communicate powerful narratives or develop innovative software solutions that solve real-world challenges"
const aboutContent =
  "<p>Welcome to my corner of the internet! I'm Rishav Raj, a passionate and driven Web-Developer and Programmer . With a blend of creativity and expertise, I strive to be a professional Web-Developer and master in DSA , craft visually stunning designs that communicate powerful narratives or develop innovative software solutions that solve real-world challenges</p>"

  "<p>A Journey of Curiosity</p>;"
  
  
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/postDB");
const postSchema = {
  title: String,
  content: String,
};
const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  res.render("portfolio.ejs");
});
app.get("/home", function (req, res) {
  res.render("portfolio.ejs");
});
app.get("/home2", function (req, res) {
  Post.find()
    .then(function (posts) {
      res.render("home 2", {
        startingContent: homeStartingContent,
        posts: posts,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
})
app.get("/about", function (req, res) {
  res.render("about"/* , { aboutContent: aboutContent } */);
});
app.get("/about2", function (req, res) {
  res.render("about 2"/* , { aboutContent: aboutContent } */);
});

app.get("/contact", function (req, res) {
  res.render("contact.ejs");
});
app.get("/skill", function (req, res) {
  res.render("skill.ejs");
});
app.get("/project", function (req, res) {
  res.render("project.ejs");
});
app.get("/achievement", function (req, res) {
  res.render("achievement.ejs");
});

app.post("/contact", function (req, res) {
  Post.find()
    .then(function (posts) {
      res.render("home 2", {
        startingContent: homeStartingContent,
        posts: posts,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save();
  Post.find()
    .then(function (posts) {
      res.render("home 2", {
        startingContent: homeStartingContent,
        posts: posts,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/posts/:postId", function (req, res) {
  const requestedId = req.params.postId;
  Post.findOne({ _id: requestedId })
    .then(function (post) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    })
    .then(function (err) {
      console.log(err);
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
