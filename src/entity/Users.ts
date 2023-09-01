import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import Foyer from "./Foyer";

@Entity({name: "USERS"})
export default class Users{
    @PrimaryGeneratedColumn('increment', {name: "ID"})
    id;
    @Column({unique: true, name: "EMAIL"})
    email: string;
    @Column({name: "PASSWORD"})
    password: string;
    @Column({name: "ROLE"})
    role: string;
    @ManyToOne(()=>Foyer)
    @JoinColumn({ name: 'FOYERID'})
    foyer: Foyer;
}
