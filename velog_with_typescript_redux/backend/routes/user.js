const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { User } = require("../models");

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
        username: req.body.username,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", (req, res, next) => {
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

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.patch("/update", async (req, res, next) => {
  try {
    await User.update(
      {
        git: req.body.git,
        email: req.body.email,
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

router.post("/update/image", upload.single("image"), async (req, res, next) => {
  try {
    await User.update(
      {
        profileImg: req.file.path,
      },
      {
        where: { id: req.body.id },
      }
    );
    await res.status(200).json(req.file.path);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/findUsername", async (req, res) => {
  const exUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (exUser) return res.status(403).send(false);
  else return res.status(200).send(true);
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
