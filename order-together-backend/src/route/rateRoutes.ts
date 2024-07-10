import { Router } from 'express';
import RateController from '../controller/rateController';

const router = Router();

router.post('/ratings', RateController.addRating);
router.get('/ratings', RateController.getRatings);

export default router;
