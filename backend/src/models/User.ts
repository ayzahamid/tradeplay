// User.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import Product from './Product';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

User.hasMany(Product, { foreignKey: 'sellerId' });

export default User;
