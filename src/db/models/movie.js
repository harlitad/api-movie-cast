'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.Cast, {through : "MovieCast"})
    }
  };
  Movie.init({
    name: DataTypes.STRING(100),
    language: DataTypes.STRING(30),
    status: DataTypes.STRING(10),
    rating: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Movie',
    underscored: true,
    paranoid: true,
    tableName : "movies",
    hooks: {
      afterCreate: (record) => {
        delete record.dataValues.createdAt;
        delete record.dataValues.updatedAt;
      },
      afterUpdate: (record) => {
        delete record.dataValues.deletedAt;
      },
    },
  });
  return Movie;
};