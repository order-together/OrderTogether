import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('order_together_rating')
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    raterUid: string;

    @Column()
    ratedUid: string;

    @Column()
    rating: number;

    @Column({ nullable: true })
    comment: string;

    @ManyToOne(() => UserEntity, user => user.ratedRating)
    ratedUser: UserEntity;

    @ManyToOne(() => UserEntity, user => user.raterRating)
    raterUser: UserEntity;
}
