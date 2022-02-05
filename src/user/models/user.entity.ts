import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { userRoles } from "./user.interface";



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

    @Column({type : 'enum', enum : userRoles, default:userRoles.USER})
    role : userRoles

    @BeforeInsert()
        toLowerCase(){
            this.email = this.email.toLowerCase()
        }
}