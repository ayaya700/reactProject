const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");

//create
router.post("/", async (req, res) => {
  const newpost = new Post(req.body);
  try {
    const savedpost = await newpost.save();
    res.status(200).json(savedpost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You are not authorized to update this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    // Log the post object to ensure it's retrieved correctly

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.username !== req.body.username) {
      return res.status(401).json({ error: "You can delete only your post" });
    }

    await Post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    // Log any errors that occur during the deletion process

    res.status(500).json({ error: "An internal server error occurred" });
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
