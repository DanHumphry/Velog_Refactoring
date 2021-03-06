const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { User, Post, Tag } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

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
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + "_" + new Date().getTime() + ext); // 제로초15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/signUp", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 이메일입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.email.split("@")[0],
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (serverErr, user, clientErr) => {
    if (serverErr) {
      console.error(serverErr);
      return next(serverErr);
    }
    if (clientErr) {
      return res.status(401).send(clientErr.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.patch("/update", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        git: req.body.git,
        nickname: req.body.nickname,
        myIntroduce: req.body.myIntroduce,
      },
      {
        where: { id: req.body.id },
      }
    );
    await res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post(
  "/update/image",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    try {
      await User.update(
        { profileImg: `http://localhost:3065/${req.file.path}` },
        { where: { id: req.body.id } }
      );
      await res.status(200).json(`http://localhost:3065/${req.file.path}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post("/findEmail", isNotLoggedIn, async (req, res) => {
  const exUser = await User.findOne({
    where: { email: req.body.email },
  });
  if (exUser) return res.status(403).send(false);
  else return res.status(200).send(true);
});

router.get("/getUser", (req, res) => {
  return res.status(200).json(req.user);
});

router.get(
  "/auth/google",
  isNotLoggedIn,
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/redirect",
  isNotLoggedIn,
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get(
  "/auth/kakao",
  isNotLoggedIn,
  passport.authenticate("kakao", {
    failureRedirect: "#!/login",
  })
);

router.get(
  "/auth/kakao/redirect",
  isNotLoggedIn,
  passport.authenticate("kakao", {
    failureRedirect: "#!/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get("/auth/github", isNotLoggedIn, passport.authenticate("github"));

router.get(
  "/auth/github/redirect",
  isNotLoggedIn,
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.post("/delete", isLoggedIn, async (req, res, next) => {
  req.logout();
  req.session.destroy();

  try {
    const Posts = await Post.findAll({
      where: { UserId: req.body.userId },
      include: [
        {
          model: Tag,
          attributes: ["id"],
        },
      ],
    });
    const tagsId = [];
    Posts.forEach((post) => {
      post.dataValues.tags.forEach((tag) => tagsId.push(tag.id));
    });

    await Tag.destroy({
      where: { id: tagsId },
    });
    await Post.destroy({
      where: { UserId: req.body.userId },
    });
    await User.destroy({
      where: { id: req.body.userId },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.send("ok");
});

module.exports = router;
