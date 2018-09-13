module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      validate: {
        // notNull: true,  DEPRACTED. SEE ERROR AND FIX HOW THIS CHECKS.
        notEmpty: true,
        len: [1, 24]
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        // notNull: true,  ^^
        notEmpty: true,
        len: [59, 61]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    numVisits: {
      type: DataTypes.INTEGER,
      validate: {
      }
    }
  });
  return User;
};