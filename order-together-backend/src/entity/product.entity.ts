import {Column,  Entity, ManyToOne, OneToMany} from "typeorm";
import {IsDecimal, IsInt,  MinLength} from "class-validator";
import {BaseTemplate} from "./base.entity";
import {UserEntity} from "./user.entity";
import {OrderEntity} from "./order.entity";


@Entity('order_together_product')
export class ProductEntity extends BaseTemplate{

    @Column()
    @MinLength(1)
    name: string

    @Column({nullable: true, default: null})
    description: string | null = null

    @Column({nullable: true, default: null})
    productURL: string | null = null

    @Column({nullable: true, default: null})
    imgURL: string | null = null

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    @IsDecimal()
    price: number

    @Column({nullable: true, default: null})
    @IsInt()
    targetQuantity: number | null = null

    @Column({nullable: true, default: null})
    @IsInt()
    currentQuantity: number | null = null

    @Column({nullable: true, default: null})
    expireAt: Date

    @Column({nullable: true, default: null})
    safetyDetect: string | null = null

    @Column({nullable: true, default: null})
    status: string | null = null

    @OneToMany(() => OrderEntity, order => order.product)
    orders: OrderEntity[]

    @ManyToOne( ()=> UserEntity, user=>user.createProducts)
    creator: UserEntity
}
