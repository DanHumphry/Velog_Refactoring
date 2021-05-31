const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, User, Comment, ReComment } = require("../models");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + "_" + new Date().getTime() + ext); // 제로초15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/", upload.single("image"), async (req, res, next) => {
  // POST /post
  try {
    const image = req.file ? `http://localhost:3065/${req.file.path}` : null;
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image,
      like: 0,
      language: req.body.language,
      UserId: req.user.id,
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname", "profileImg", "myIntroduce"],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    console.log("t:", req.params.postId);

    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname", "profileImg", "myIntroduce"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "profileImg"],
            },
            {
              model: ReComment,
              include: [
                {
                  model: User,
                  attributes: ["id", "nickname", "profileImg"],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/delete", async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: +req.params.postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/:postId/update",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const image = req.file ? `http://localhost:3065/${req.file.path}` : null;

      await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
          image,
          language: req.body.language,
        },
        {
          where: { id: req.params.postId },
        }
      );

      const fullPost = await Post.findOne({
        where: { id: req.params.postId },
        include: [
          {
            model: User, // 게시글 작성자
            attributes: ["id", "nickname", "profileImg", "myIntroduce"],
          },
        ],
      });

      res.status(201).json(fullPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post("/:postId/like", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    let liker = post.dataValues.liker;
    if (liker) liker += `,${req.body.userId}`;
    else liker = `${req.body.userId}`;

    await Post.update(
      {
        like: post.dataValues.like + 1,
        liker,
      },
      {
        where: { id: req.params.postId },
      }
    );

    res
      .status(200)
      .json({ postId: +req.params.postId, userId: req.body.userId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/unlike", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    const liker = post.dataValues.liker.split(",");
    const idx = liker.find((v) => +v === req.body.userId);
    liker.splice(idx, 1);

    await Post.update(
      {
        like: post.dataValues.like - 1,
        liker: liker.join(""),
      },
      {
        where: { id: req.params.postId },
      }
    );

    res
      .status(200)
      .json({ postId: +req.params.postId, userId: req.body.userId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: +req.params.postId,
      UserId: req.body.userId,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment/update", async (req, res, next) => {
  try {
    await Comment.update(
      {
        title: req.body.title,
        content: req.body.content,
        image,
        language: req.body.language,
      },
      {
        where: { id: req.params.postId },
      }
    );

    const fullPost = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname", "profileImg", "myIntroduce"],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:commentId/comment/delete", async (req, res, next) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.commentId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ commentId: +req.params.commentId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:commentId/reComment", async (req, res, next) => {
  try {
    const post = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const reComment = await ReComment.create({
      content: req.body.content,
      UserId: req.body.userId,
      CommentId: req.params.commentId,
    });
    const fullReComment = await ReComment.findOne({
      where: { id: reComment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
      ],
    });
    res.status(201).json(fullReComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:reCommentId/reComment/delete", async (req, res, next) => {
  try {
    await ReComment.destroy({
      where: {
        id: req.params.reCommentId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ reCommentId: +req.params.reCommentId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
