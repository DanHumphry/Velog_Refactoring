const passport = require("passport");
const { User } = require("../models");
const KakaoStrategy = require("passport-kakao").Strategy;

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        callbackURL: "http://localhost:3065/user/auth/kakao/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = `${profile._json.id}_kakao`;

        try {
          const user = await User.findOne({
            where: { email },
          });

          if (user) {
            return done(null, user);
          } else {
            const newUser = await User.create({
              email: email,
              nickname: profile._json.properties.nickname,
              profileImg: profile._json.properties.profile_image,
            });
            return done(null, newUser);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
