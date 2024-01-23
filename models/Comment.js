const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init({
  // Define Comment attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'post',
      key: 'id'
    }
  }
}, {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment',
});

module.exports = Comment;