module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
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
=======
    var User  = sequelize.define("User", {
      text: DataTypes.STRING,
      description: DataTypes.TEXT
>>>>>>> master
    });
    return User;
  };