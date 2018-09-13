module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    QuoteID: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    QuoteCategory: DataTypes.STRING,
    Quote: DataTypes.TEXT
  });
  return Example;
};
