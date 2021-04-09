import { Sequelize } from 'sequelize';
import { envVal } from '../envVal';
import * as m from './models';

export const sequelize: Sequelize = new Sequelize(envVal.pgConnectionString, {
  logging: true
});

// Database table models
export const DatabaseMigration = m.DatabaseMigrationC(sequelize);
export const User = m.UserC(sequelize);
export const PasswordUser = m.PasswordUserC(sequelize);
export const GoogleOauthUser = m.GoogleOauthUserC(sequelize);
export const Car = m.CarC(sequelize);
export const Favourite = m.FavouriteC(sequelize);
export const Cart = m.CartC(sequelize);

PasswordUser.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(PasswordUser, { foreignKey: 'userId' });

GoogleOauthUser.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(GoogleOauthUser, { foreignKey: 'userId' });

Car.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Car, { foreignKey: 'userId' });

Car.belongsToMany(User, {
  through: Favourite,
  foreignKey: 'carId'
});
User.belongsToMany(Car, {
  through: Favourite,
  foreignKey: 'userId'
});

User.hasMany(Cart, { foreignKey: 'userId' });
Car.belongsTo(Cart, { foreignKey: 'carId' });

export const testDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}

export const dropAllTables = async (): Promise<void> => {
  await sequelize.drop();
  console.log("All tables dropped!");
}
