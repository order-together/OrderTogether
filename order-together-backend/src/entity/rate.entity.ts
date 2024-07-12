import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import {OrderEntity} from "./order.entity";

@Entity('order_together_rating')
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    raterUid: string;

    @Column({nullable: true, default: null})
    ratedUid: string;

    @Column()
    rating: number;

    @Column({ nullable: true })
    comment: string;

    @Column()
    role: 'initiator' | 'participant';

    @ManyToOne(() => OrderEntity, order => order.ratings)
    participantOrder: OrderEntity;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, user => user.ratedRating)
    ratedUser: UserEntity;

    @ManyToOne(() => UserEntity, user => user.raterRating)
    raterUser: UserEntity;
}
