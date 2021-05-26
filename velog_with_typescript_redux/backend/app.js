const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const userRouter = require("./routes/user");
const emailRouter = require("./routes/email");
const postRouter = require("./routes/post");

const db = require("./models");

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();
dotenv.config();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", userRouter);
app.use("/sendMail", emailRouter);
app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
