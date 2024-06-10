import {Column, Entity, Unique, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import {BaseTemplate} from './base.entity'
import {IsDecimal, IsEmail, Length, Max, Min} from 'class-validator'
import {RateEntity} from "./rate.entity";
import {ProductEntity} from "./product.entity";
import {OrderEntity} from "./order.entity";


@Entity('order_together_user')
@Unique(['email'])
export class UserEntity extends BaseTemplate {
    @Column({nullable: true, default: null})
    @Length(1, 100)
    userName: string | null = null

    @Column()
    @IsEmail()
    @Length(5, 150)
    email: string

    @Column({nullable: true, default: null})
    @Length(6, 200)
    password: string | null = null

    @Column({nullable: true, default: null})
    @Length(1, 100)
    firstName: string | null = null

    @Column({nullable: true, default: null})
    @Length(1, 100)
    lastName: string | null = null

    @Column({nullable: true, default: null})
    @Min(15)
    @Max(120)
    age: number | null = null

    @Column({nullable: true, default: null})
    address: string | null = null

    @Column({nullable: true, default: null})
    phone: string | null = null

    @Column({nullable: true, default: false})
    isStaff: boolean = false

    @Column({nullable: true, default: null})
    activationToken: string | null = null

    @Column({nullable: true, type: 'timestamp'})
    activationTokenExpires: Date

    @Column({
        type: 'decimal',
        precision: 2,
        scale: 1
    })
    @IsDecimal()
    initiatorRating: number | null = null

    @Column({
        type: 'decimal',
        precision: 2,
        scale: 1
    })
    @IsDecimal()
    participantRating: number | null = null

    @Column({
        type: 'decimal',
        precision: 2,
        scale: 1
    })
    @IsDecimal()
    overallRating: number | null = null

    @Column({nullable: false, default: null})
    status: string

    @OneToMany(() => RateEntity, rate => rate.ratedUser)
    ratedRating: RateEntity[]

    @OneToMany(() => RateEntity, rate => rate.raterUser)
    raterRating: RateEntity[]

    @OneToMany(() => ProductEntity, product => product.creator)
    createProducts: ProductEntity[]

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[]

    @ManyToMany(()=> ProductEntity)
    @JoinTable()
    collectProducts: ProductEntity[]
}
