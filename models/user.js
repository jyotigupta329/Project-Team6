module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      userName: {
          type: DataTypes.STRING,
          validate: {

          }
      },
      password: {
        type: DataTypes.STRING,
        validate: {

        }
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {

        }
        
      }
    });
    return User;
  };