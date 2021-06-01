const express = require("express");
const sequelize = require("sequelize");

const { Post, User, Comment, ReComment } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const order = req.body.href === "like" ? "Likers" : "createdAt";
    console.log(order);
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [sequelize.Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
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
      // order: [["createdAt", "DESC"]],
      attributes: [
        "Likers",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM posts WHERE posts.id = posts.Likers.postId"
          ),
          "LikeCount",
        ],
      ],
      order: [[sequelize.literal("LikeCount"), "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
