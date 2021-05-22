const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true, // 고유한 값
        },
        nickname: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        git: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        profileImg: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        myIntroduce: {
          type: DataTypes.STRING(120),
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  }
};
