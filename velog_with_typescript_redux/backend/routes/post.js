const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, User, Comment, ReComment, Tag, Series } = require("../models");
const { isLoggedIn } = require("./middlewares");

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

router.post("/", isLoggedIn, upload.single("image"), async (req, res, next) => {
  // POST /post

  try {
    const image = req.file ? `http://localhost:3065/${req.file.path}` : null;
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image,
      UserId: req.user.id,
    });

    if (req.body.tag) {
      const tags = req.body.tag.split(",");
      const result = await Promise.all(
        tags.map((tag) =>
          Tag.findOrCreate({
            where: { name: tag.toLowerCase() },
          })
        )
      );
      await post.addTags(result.map((v) => v[0]));
    }

    if (req.body.series) {
      const result = await Series.findOrCreate({
        where: { name: req.body.series.toLowerCase() },
      });

      await post.addSeries(result[0]);
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
          attributes: ["id"],
          include: [
            {
              model: ReComment,
              attributes: ["id"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Tag,
          attributes: ["id", "name"],
        },
        {
          model: Series,
          attributes: ["id", "name"],
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
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Tag,
          attributes: ["id", "name"],
        },
        {
          model: Series,
          attributes: ["id", "name"],
          include: [
            {
              model: Post,
              attributes: ["id", "title", "UserId"],
              where: { UserId: post.dataValues.UserId },
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

router.delete("/:postId/delete", isLoggedIn, async (req, res, next) => {
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
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const image =
        req.file !== undefined
          ? `http://localhost:3065/${req.file.path}`
          : req.body.image
          ? req.body.image
          : null;

      await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
          image,
        },
        {
          where: { id: req.params.postId },
        }
      );

      const post = await Post.findOne({ where: { id: req.params.postId } });

      if (req.body.tag) {
        const tags = req.body.tag.split(",");
        const result = await Promise.all(
          tags.map((tag) =>
            Tag.findOrCreate({
              where: { name: tag.toLowerCase() },
            })
          )
        );
        await post.setTags(result.map((v) => v[0]));
      } else {
        await post.setTags(null);
      }

      if (req.body.series) {
        const result = await Series.findOrCreate({
          where: { name: req.body.series.toLowerCase() },
        });

        await post.setSeries(result[0]);
      } else {
        await post.setSeries(null);
      }

      const fullPost = await Post.findOne({
        where: { id: req.params.postId },
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
          {
            model: User, // 좋아요 누른 사람
            as: "Likers",
            attributes: ["id"],
          },
          {
            model: Tag,
            attributes: ["id", "name"],
          },
          {
            model: Series,
            attributes: ["id", "name"],
            include: [
              {
                model: Post,
                attributes: ["id", "title", "UserId"],
                where: { UserId: post.dataValues.UserId },
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
  }
);

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    res.json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ postId: post.id, userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
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
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  "/:commentId/comment/update",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await Comment.update(
        {
          content: req.body.content,
        },
        {
          where: { id: req.params.commentId },
        }
      );

      const fullComment = await Comment.findOne({
        where: { id: req.params.commentId },
        include: [
          {
            model: User, // 게시글 작성자
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
      });

      res.status(201).json(fullComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/:commentId/comment/delete",
  isLoggedIn,
  async (req, res, next) => {
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
  }
);

router.post("/:commentId/reComment", isLoggedIn, async (req, res, next) => {
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

router.post(
  "/:reCommentId/reComment/update",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await ReComment.update(
        {
          content: req.body.content,
        },
        {
          where: { id: req.params.reCommentId },
        }
      );

      const fullReComment = await ReComment.findOne({
        where: { id: req.params.reCommentId },
        include: [
          {
            model: User, // 게시글 작성자
            attributes: ["id", "nickname", "profileImg"],
          },
        ],
      });

      res.status(201).json(fullReComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/:reCommentId/reComment/delete",
  isLoggedIn,
  async (req, res, next) => {
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
  }
);

router.get("/:userId/seriesList", async (req, res, next) => {
  try {
    const seriesPosts = await Series.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "name"],
      include: [
        {
          model: Post,
          where: { UserId: req.params.userId },
        },
      ],
    });

    res.status(200).json(seriesPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
