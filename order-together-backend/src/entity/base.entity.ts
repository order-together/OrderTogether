import {BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

export abstract class BaseTemplate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    uid: string

    @Column({default: true})
    isActive: boolean

    @Column({default: false})
    isDelete: boolean

    @Column({select: false})
    @CreateDateColumn()
    createdAt: Date

    @Column({select: false})
    @UpdateDateColumn()
    updatedAt: Date
}
