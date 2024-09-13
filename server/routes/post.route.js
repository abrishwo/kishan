const express = require("express");
const router = express.Router();
const postsController = require("../controllers/post.controller");
const { upload } = require("../services/storage");
const { authGuard, adminAuthGuard } = require("../services/authGuard");

//get
router.get("/feed", postsController.getFeed);
router.get("/timeline/:username", authGuard, postsController.getTimeline);
router.get("/userPosts/:username", adminAuthGuard, postsController.getTimeline);
router.get("/tag-wise/:hashtag", postsController.getPostsByHashtags);
router.get("/:postId", postsController.getPost);

//post
// app.post('/api/post', upload.fields([{ name: 'file', maxCount: 1 }]), postController.create);

// router.post(
//   "/",
//   authGuard,
//   upload.fields([{ name: 'file'}, { name: "thumbnail" }]),
//   postsController.create
// );

router.post(
  "/",
  authGuard,
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),  // Specify maxCount for each field
  postsController.create
);


router.post("/like/:postId", authGuard, postsController.likePost);
router.post("/unlike/:postId", authGuard, postsController.unlikePost);

//delete
router.delete("/remove/:id", adminAuthGuard, postsController.removePost);

module.exports = router;
