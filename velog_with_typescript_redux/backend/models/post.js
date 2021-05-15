const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Lang, { through: "PostLang" });
    db.User.belongsToMany(db.Post, { through: "Like", as: "Likers" });
  }
};
