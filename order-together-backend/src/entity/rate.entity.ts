import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {IsDecimal, IsInt} from "class-validator";
import {BaseTemplate} from "./base.entity";
import {UserEntity} from "./user.entity";


@Entity('order_together_rate')
export class RateEntity extends BaseTemplate {

    @Column({nullable: true, default: null})
    type: string | null = null

    @Column({
        type: 'decimal',
        precision: 2,
        scale: 1
    })
    @IsDecimal()
    rating: number | null = null

    @Column({nullable: true, default: null})
    comment: string | null = null

    @ManyToOne( ()=> UserEntity, user=>user.ratedRating)
    ratedUser: UserEntity

    @ManyToOne( ()=> UserEntity, user=>user.raterRating)
    raterUser: UserEntity
}
