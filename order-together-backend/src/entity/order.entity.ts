import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {IsDecimal, IsInt} from "class-validator";
import {BaseTemplate} from "./base.entity";
import {UserEntity} from "./user.entity";
import {ProductEntity} from "./product.entity";
import {RatingEntity} from "./rate.entity";


@Entity('order_together_order')
export class OrderEntity extends BaseTemplate {

    @Column({nullable: true, default: null})
    @IsInt()
    quantity: number | null = null

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    @IsDecimal()
    totalPrice: number

    @Column({nullable: true, default: null})
    status: string | null = null // "pending", "started", "completed", "rated"

    @ManyToOne( ()=> UserEntity, user=>user.orders)
    user: UserEntity

    @ManyToOne( ()=> ProductEntity, product=>product.orders)
    product:ProductEntity

    @OneToMany(() => RatingEntity, rating => rating.participantOrder)
    ratings: RatingEntity[];
}
