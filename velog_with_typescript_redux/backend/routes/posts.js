const express = require("express");
const sequelize = require("sequelize");

const { Post, User, Comment, ReComment } = require("../models");

const router = express.Router();

router.post("/liked", async (req, res, next) => {
  try {
    const Posts = await Post.findAll({
      include: [
        {
          model: User,
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
      ],
      order: [["createdAt", "DESC"]],
    });

    let liked = Posts.sort(
      (a, b) => b.dataValues.Likers.length - a.dataValues.Likers.length
    );

    if (req.body.lastIdx) {
      liked = liked.slice(req.body.lastIdx, req.body.lastIdx + 10);
    } else {
      liked = liked.slice(0, 10);
    }

    res.status(200).json(liked);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const where = {};

    if (parseInt(req.body.lastId, 10)) {
      where.id = { [sequelize.Op.lt]: parseInt(req.body.lastId, 10) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [
        {
          model: User,
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
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:userId/liked", async (req, res, next) => {
  try {
    const myPosts = await Post.findAll({
      where: { UserId: req.params.userId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profileImg", "myIntroduce", "git"],
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
      ],
      order: [["createdAt", "DESC"]],
    });

    let liked = myPosts.sort(
      (a, b) => b.dataValues.Likers.length - a.dataValues.Likers.length
    );

    if (req.body.lastIdx) {
      liked = liked.slice(req.body.lastIdx, req.body.lastIdx + 5);
    } else {
      liked = liked.slice(0, 5);
    }

    res.status(200).json(liked);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.body.lastId, 10)) {
      where.id = { [sequelize.Op.lt]: parseInt(req.body.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const myPosts = await Post.findAll({
      where,
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profileImg", "myIntroduce", "git"],
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
      ],
    });

    res.status(200).json(myPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
