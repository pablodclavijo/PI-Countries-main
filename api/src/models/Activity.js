const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true 
    },
    difficulty:{
      type: DataTypes.INTEGER, 
      allowNull: true, 
      validate: {
        min: 1,
        max: 5
      }
    },
    duration:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    season:{
      type: DataTypes.ENUM('Summer', 'Winter', 'Fall', 'Spring'),
      allowNull: true 
    },
    creadoPor:{
      type: DataTypes.STRING,
      defaultValue: "Pablo"
    },
  });
};
