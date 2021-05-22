const passport = require("passport");
const { User } = require("../models");
const GitHubStrategy = require("passport-github").Strategy;

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3065/user/auth/github/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = `${profile._json.id}_github`;

        try {
          const user = await User.findOne({
            where: { email },
          });

          if (user) {
            return done(null, user);
          } else {
            const newUser = await User.create({
              email: email,
              nickname: profile._json.login,
              profileImg: profile._json.avatar_url,
              git: profile._json.html_url,
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
