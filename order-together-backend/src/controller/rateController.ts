import { Request, Response } from 'express';
import gDB from "../initDataSource";
import { RateEntity } from '../entity/rate.entity';

const ratingRepo = gDB.getRepository(RateEntity);

class RatingController {
    // Add comment and rating
    static async addRating(request: Request, response: Response) {
        const { rate, comment } = request.body;

        if (!rate) {
            return response.status(400).send({ message: 'Rating are required.' });
        }

        try {
            const newRating = ratingRepo.create({
                rate,
                comment
            });

            await ratingRepo.save(newRating);
            return response.status(201).send({ message: 'Rating added successfully.', newRating });
        } catch (e) {
            return response.status(500).send({ message: 'Error adding rating.' });
        }
    }
}

export default RatingController;
