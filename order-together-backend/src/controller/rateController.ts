import { Request, Response } from 'express';
import gDB from "../initDataSource";
import { RatingEntity } from '../entity/rate.entity';
import { UserEntity } from '../entity/user.entity';


const ratingRepo = gDB.getRepository(RatingEntity);
const userRepo = gDB.getRepository(UserEntity);


class RatingController {
    // Add comment and rating
    static async addRating(request: Request, response: Response) {
        const { raterUid, ratedUid, rating, comment } = request.body;

        if (!raterUid || !ratedUid || !rating) {
            return response.status(400).send({ message: 'Rater UID, rated UID, and rating are required.' });
        }

        try {
            const newRating = ratingRepo.create({
                raterUid,
                ratedUid,
                rating,
                comment
            });

            await ratingRepo.save(newRating);

            // Re-calculate the average rating for rated user
            const ratedUser = await userRepo.findOne({ where: { uid: ratedUid } });
            if (ratedUser) {
                const ratings = await ratingRepo.find({ where: { ratedUid: ratedUid } });
                const averageRating = ratings.reduce((acc, curr) => acc +curr.rating, 0) / ratings.length;
                ratedUser.overallRating = parseFloat(averageRating.toFixed(2));
                await userRepo.save(ratedUser);
            }

            return response.status(201).send({ message: 'Rating added successfully.', newRating });
        } catch (e) {
            return response.status(500).send({ message: 'Error adding rating.' });
        }
    }

    static async getRatings(request: Request, response: Response) {
        try {
            const ratings = await ratingRepo.find();
            return response.status(200).send(ratings);
        } catch (e) {
            return response.status(500).send({ message: 'Error fetching ratings.' });
        }
    }
}

export default RatingController;
