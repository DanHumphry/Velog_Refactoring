const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");
//일어나서 할것 -> 1. db 수정했으니 db에 맞게 회원 수정할 필요 있음
// 어떤거냐면 username중복확인 없애고, email 중복확인 기능 넣고
// 그에따른 구글 passport 전략과 local 전략수정 필요 로컬은 유저네임으로 중복확인등 아니라 이제 이메일로
//구글 passport 는 유저 생성과 동시에 로그인까지 이어지도록

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 이메일입니다!" });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
