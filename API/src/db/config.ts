import { Sequelize } from 'sequelize';
import env from '../env'


const { DB_URL } = env

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
});

export default sequelize;