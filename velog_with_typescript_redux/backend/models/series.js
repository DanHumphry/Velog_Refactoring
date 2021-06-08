const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Series extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        modelName: "series",
        tableName: "series",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Series.belongsToMany(db.Post, { through: "PostSeries" });
  }
};
