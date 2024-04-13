const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "BlogUsers",
  "yourUsername",
  "yourPassword",
  {
    dialect: "mssql",
    host: "my-azure-sql-server-endpoint",
  }
);

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { type: DataTypes.STRING, allowNull: false },
});

export default User;
