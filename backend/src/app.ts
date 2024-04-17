import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import productRoutes from './routes/productRoutes';
import { sequelize } from './config/database';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());


app.use(cors({
  origin: '*'
}));

app.use('/api/auth', authRoutes);
app.use('/api/auth', productRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error: Error) => {
  console.error('Error syncing database:', error);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
