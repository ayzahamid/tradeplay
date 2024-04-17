

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public status!: 'Available' | 'Reserved' | 'Sold';
  public offers!: number[];

  public static associate(models: any) {
    Product.belongsTo(User, { foreignKey: 'sellerId' });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('Available', 'Reserved', 'Sold'),
      allowNull: false,
      defaultValue: 'Available'
    },
    offers: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  }
);


export default Product;
