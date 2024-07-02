import express, { Application } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './route/product';
import orderRoutes from './route/orderRoutes';
import userRoutes from './route/user';
import rateRoutes from './route/rateRoutes';


const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', productRoutes);
app.use('/api', orderRoutes); 
app.use('/api', userRoutes);
app.use('/api', rateRoutes);

app.get('/', (req, res) => {
  res.send('Order Together API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});