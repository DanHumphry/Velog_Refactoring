const express = require("express");
const sequelize = require("sequelize");

const { Post, User, Comment, ReComment, Tag, Series } = require("../models");

const router = express.Router();

router.post("/liked", async (req, res, next) => {
  try {
    let where = {};
    if (req.body.tagList) {
      where = { id: { [sequelize.Op.and]: req.body.tagList } };
    }

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
        {
          model: Tag,
          attributes: ["id", "name"],
          where,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    let liked = Posts.sort(
      (a, b) => b.dataValues.Likers.length - a.dataValues.Likers.length
    );

    if (req.body.lastId) {
      liked = liked.slice(req.body.lastId, req.body.lastId + 10);
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
        {
          model: Tag,
          attributes: ["id", "name"],
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
        {
          model: Tag,
          attributes: ["id", "name"],
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
        {
          model: Tag,
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(myPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userId/series", async (req, res, next) => {
  try {
    const seriesPosts = await Series.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          where: { UserId: req.params.userId },
          model: Post,
          attributes: ["id", "image", "title"],
        },
      ],
    });

    res.status(200).json(seriesPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/tags", async (req, res, next) => {
  try {
    const Tags = await Tag.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });

    const sortTags = Tags.sort((a, b) => b.Posts.length - a.Posts.length);

    res.status(200).json(sortTags);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/tags/filter", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
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
        {
          model: Tag,
          attributes: ["id", "name"],
          where: { id: { [sequelize.Op.and]: req.body.tagList } },
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

router.post("/tags/filter/scroll", async (req, res, next) => {
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
        {
          model: Tag,
          attributes: ["id", "name"],
          where: { id: { [sequelize.Op.and]: req.body.tagList } },
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

module.exports = router;
