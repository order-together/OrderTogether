import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {IsInt, Min, Max} from "class-validator";
import {BaseTemplate} from "./base.entity";
import {UserEntity} from "./user.entity";
import {OrderEntity} from "./order.entity";
import { relative } from "path/win32";



@Entity('order_together_rate')
export class RateEntity extends BaseTemplate {

    @Column({nullable: true, default: null})
    type: string | null = null

    @Column()
    @IsInt()
    @Min(1)
    @Max(5)
    rate: number

    @Column({nullable: true, default: null})
    comment: string | null = null

    @ManyToOne( ()=> UserEntity, user=>user.ratedRating)
    ratedUser: UserEntity

    @ManyToOne( ()=> UserEntity, user=>user.raterRating)
    raterUser: UserEntity

    @ManyToOne( ()=> OrderEntity, order=>order.rate)
    order: OrderEntity
}
