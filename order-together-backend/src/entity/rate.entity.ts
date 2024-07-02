import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
