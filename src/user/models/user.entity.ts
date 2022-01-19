import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userName: string

    @Column({unique : true})
    email: string

    @Column()
    password: string

    @BeforeInsert()
     toLowerCase(){
         this.email = this.email.toLowerCase()
     }
}