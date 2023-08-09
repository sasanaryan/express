const Blogpost = require("../models/blogpost");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newPost = new Blogpost(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const post = await Blogpost.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    let posts;
    posts = await Blogpost.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

///UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Blogpost.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Blogpost.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
