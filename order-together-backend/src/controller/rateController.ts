import { Request, Response } from 'express';
import gDB from "../initDataSource";
import { RatingEntity } from '../entity/rate.entity';
import { UserEntity } from '../entity/user.entity';


const ratingRepo = gDB.getRepository(RatingEntity);
const userRepo = gDB.getRepository(UserEntity);


class RatingController {
    // Add comment and rating
    static async addRating(request: Request, response: Response) {
        const { raterUid, ratedUid, rating, comment, role } = request.body;

        if (!raterUid || !ratedUid || !rating || !role) {
            return response.status(400).send({ message: 'Rater UID, rated UID, rating and role are required.' });
        }

        try {
            const newRating = ratingRepo.create({
                raterUid,
                ratedUid,
                rating,
                comment,
                role
            });

            await ratingRepo.save(newRating);

            // Re-calculate the average rating for rated user
            const ratedUser = await userRepo.findOne({ where: { uid: ratedUid } });
            if (ratedUser) {
                const initiatorRatings = await ratingRepo.find({ where: { ratedUid: ratedUid, role: 'initiator' } });
                const participantRatings = await ratingRepo.find({ where: { ratedUid: ratedUid, role: 'participant' } });

                const initiatorRatingAverage = initiatorRatings.length > 0
                    ? initiatorRatings.reduce((acc, curr) => acc + curr.rating, 0) / initiatorRatings.length
                    : 0;

                const participantRatingAverage = participantRatings.length > 0
                    ? participantRatings.reduce((acc, curr) => acc + curr.rating, 0) / participantRatings.length
                    : 0;

                ratedUser.initiatorRating = parseFloat(initiatorRatingAverage.toFixed(2));
                ratedUser.participantRating = parseFloat(participantRatingAverage.toFixed(2));

                const validRatings = [];
                if (initiatorRatingAverage > 0) validRatings.push(initiatorRatingAverage);
                if (participantRatingAverage > 0) validRatings.push(participantRatingAverage);

                ratedUser.overallRating = validRatings.length > 0
                    ? parseFloat((validRatings.reduce((acc, curr) => acc + curr, 0) / validRatings.length).toFixed(2))
                    : 0;

                await userRepo.save(ratedUser);
            }

            return response.status(201).send({ message: 'Rating added successfully.', newRating });
        } catch (e) {
            return response.status(500).send({ message: 'Error adding rating.' });
        }
    }

    static async getRatings(request: Request, response: Response) {
        try {
            const { userId, role, sortBy } = request.query;

            let whereCondition = {};
            if (userId) {
                whereCondition = { ...whereCondition, ratedUid: userId };
            }
            if (role) {
                whereCondition = { ...whereCondition, role: role };
            }

            let orderCondition = {};
            if (sortBy === 'recent') {
                orderCondition = { createdAt: 'DESC' };
            } else if (sortBy === 'favorable') {
                orderCondition = { rating: 'DESC' };
            } else if (sortBy === 'critical') {
                orderCondition = { rating: 'ASC' };
            }

            const ratings = await ratingRepo.find({ where: whereCondition, order: orderCondition });
            return response.status(200).send(ratings);
        } catch (e) {
            return response.status(500).send({ message: 'Error fetching ratings.' });
        }
    }
}

export default RatingController;
