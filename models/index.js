const User = require('./user');

User.hasOne({
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });

  module.exports = { User };