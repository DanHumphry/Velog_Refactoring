const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Lang extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: "Lang",
        tableName: "Langs",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Lang.belongsToMany(db.Post, { through: "PostLang" });
  }
};