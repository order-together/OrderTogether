import express, { Application } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './route/productRoutes';
import orderRoutes from './route/orderRoutes';


const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', productRoutes);
app.use('/api', orderRoutes); 

app.get('/', (req, res) => {
  res.send('Order Together API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});