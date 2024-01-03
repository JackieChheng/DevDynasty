const User = require('./user');

User.hasOne(Score, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  module.exports = { User };