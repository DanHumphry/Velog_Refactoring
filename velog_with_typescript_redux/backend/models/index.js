const Sequelize = require("sequelize");
const user = require("./user");
const post = require("./post");
const comment = require("./comment");
const reComment = require("./reComment");
const tag = require("./tag");
const series = require("./series");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Post = post;
db.User = user;
db.Comment = comment;
db.ReComment = reComment;
db.Tag = tag;
db.Series = series;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
