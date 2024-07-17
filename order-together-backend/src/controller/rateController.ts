import { Request, Response } from 'express';
import gDB from "../initDataSource";
import { RatingEntity } from '../entity/rate.entity';
import { UserEntity } from '../entity/user.entity';
import {OrderEntity} from "../entity/order.entity";
import { Equal } from 'typeorm';


const ratingRepo = gDB.getRepository(RatingEntity);
const userRepo = gDB.getRepository(UserEntity);


class RatingController {
    // Add comment and rating
    static async addRating(request: Request, response: Response) {
        const { raterUid, ratedUid, rating, comment, role,participantOrderUid } = request.body;

        if (!raterUid || !ratedUid || !rating || !role) {
            return response.status(400).send({ message: 'Rater UID, rated UID, rating and role are required.' });
        }

        const participantOrder = await OrderEntity.findOne({where:{uid:participantOrderUid}})

        try {
            // Re-calculate the average rating for rated user
            const ratedUser = await userRepo.findOne({ where: { uid: ratedUid } });
            const raterUser = await userRepo.findOne({ where: { uid: raterUid } });
            const newRating = ratingRepo.create({
                ratedUser,
                raterUser,
                rating,
                comment,
                role,
                participantOrder
            });

            await ratingRepo.save(newRating);
            // console.log(`ratedUser==>${JSON.stringify(ratedUser)},ratedUid=>${ratedUid}`)
            if (ratedUser) {
                const initiatorRatings = await ratingRepo.find({ where: { ratedUser: Equal(ratedUser.id), role: 'initiator' } });
                const participantRatings = await ratingRepo.find({ where: { ratedUser: Equal(ratedUser.id), role: 'participant' } });
                const initiatorRatingAverage = initiatorRatings.length > 0
                    ? initiatorRatings.reduce((acc, curr) => acc + curr.rating, 0) / initiatorRatings.length
                    : 0;
                const participantRatingAverage = participantRatings.length > 0
                    ? participantRatings.reduce((acc, curr) => acc + curr.rating, 0) / participantRatings.length
                    : 0;
                ratedUser.initiatorRating = parseFloat(initiatorRatingAverage.toFixed(2));
                ratedUser.participantRating = parseFloat(participantRatingAverage.toFixed(2));

                const validRatings = [];
                if (initiatorRatings.length  > 0)  initiatorRatings.forEach(e=>validRatings.push(e));
                if (participantRatings.length > 0) participantRatings.forEach(e=>validRatings.push(e));

                ratedUser.overallRating = validRatings.length > 0
                    ? parseFloat((validRatings.reduce((acc, curr) => acc + curr.rating, 0) / validRatings.length).toFixed(2))
                    : 0;

                await userRepo.save(ratedUser);

                if (role === 'initiator'){
                    const order = await OrderEntity.findOne({ where: { uid: participantOrderUid } })
                    order.status = 'Rated'
                    await order.save()
                }
            }

            return response.status(201).send({ message: 'Rating added successfully.', newRating });
        } catch (e) {
            return response.status(500).send({ message: 'Error adding rating.' });
        }
    }

    // static async getRatings(request: Request, response: Response) {
    //     try {
    //         const { userId, role, sortBy } = request.query;
    //
    //         const ratedUser = await userRepo.findOne({where:{uid:userId}})
    //
    //         let whereCondition = {};
    //         if (userId) {
    //             whereCondition = { ...whereCondition, ratedUser: ratedUser };
    //         }
    //         if (role) {
    //             whereCondition = { ...whereCondition, role: role };
    //         }
    //
    //         let orderCondition = {};
    //         if (sortBy === 'recent') {
    //             orderCondition = { 'rating.createdAt': 'DESC' };
    //         } else if (sortBy === 'favorable') {
    //             orderCondition = { rating: 'DESC' };
    //         } else if (sortBy === 'critical') {
    //             orderCondition = { rating: 'ASC' };
    //         }
    //
    //         const ratings = await ratingRepo.createQueryBuilder('rating')
    //             .leftJoinAndSelect('rating.raterUser', 'rater')
    //             .leftJoinAndSelect('rating.participantOrder', 'order')
    //             .leftJoinAndSelect('order.product', 'product')
    //             .where(whereCondition)
    //             .orderBy(orderCondition)
    //             .select([
    //                 'rating.id',
    //                 'rating.rating',
    //                 'rating.comment',
    //                 'rating.createdAt',
    //                 'rater.username',
    //                 'order.id',
    //                 'order.uid',
    //                 'product.uid'
    //             ])
    //             .getMany();
    //
    //         return response.status(200).send(ratings);
    //     } catch (e) {
    //         return response.status(500).send({ message: 'Error fetching ratings.' });
    //     }
    // }

    static async getRatings(request: Request, response: Response) {
        try {
            const { userId, role, sortBy } = request.query;

            const ratedUser = await userRepo.findOne({ where: { uid: userId } });

            let whereCondition = {};
            if (userId) {
                whereCondition = { ...whereCondition, ratedUser: ratedUser };
            }
            if (role) {
                whereCondition = { ...whereCondition, role: role };
            }

            const ratings = await ratingRepo.createQueryBuilder('rating')
                .leftJoinAndSelect('rating.raterUser', 'rater')
                .leftJoinAndSelect('rating.participantOrder', 'order')
                .leftJoinAndSelect('order.product', 'product')
                .where(whereCondition)
                .select([
                    'rating.id',
                    'rating.rating',
                    'rating.comment',
                    'rating.createdAt',
                    'rater.username',
                    'order.id',
                    'order.uid',
                    'product.uid'
                ])
                .getMany();

            function quickSort(data, compareFunction) {
                if (data.length <= 1) {
                    return data;
                }
                const pivot = data[Math.floor(data.length / 2)];
                const left = [];
                const right = [];
                const equal = [];

                for (const item of data) {
                    const comparison = compareFunction(item, pivot);
                    if (comparison < 0) {
                        left.push(item);
                    } else if (comparison > 0) {
                        right.push(item);
                    } else {
                        equal.push(item);
                    }
                }
                return [...quickSort(left, compareFunction), ...equal, ...quickSort(right, compareFunction)];
            }

            function sortData(data, sortBy) {
                if (sortBy === 'recent') {
                    return quickSort(data, (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (sortBy === 'favorable') {
                    return quickSort(data, (a, b) => b.rating - a.rating);
                } else if (sortBy === 'critical') {
                    return quickSort(data, (a, b) => a.rating - b.rating);
                }
                return data;
            }

            const sortedRatings = sortData(ratings, sortBy);

            return response.status(200).send(sortedRatings);
        } catch (e) {
            return response.status(500).send({ message: 'Error fetching ratings.' });
        }
    }

}

export default RatingController;
