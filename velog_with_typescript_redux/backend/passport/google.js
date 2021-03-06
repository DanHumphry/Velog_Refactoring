const passport = require("passport");
const { User } = require("../models");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3065/user/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          _json: { email },
        } = profile;

        try {
          const user = await User.findOne({
            where: { email },
          });

          if (user) {
            return done(null, user);
          } else {
            const newUser = await User.create({
              email: email,
              nickname: email.split("@")[0],
              profileImg: profile._json.picture,
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
