import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "EVENEMENT"})
export default class Evenement{
    @PrimaryGeneratedColumn('increment', {name: "ID"})
    id: number;
    @Column({name: "NOM"})
    titre: string;
    @Column({name: 'DATEEVENT', type: 'date'})
    dateEvent:Date;
    @Column('clob',{name: "DETAILS"})
    details: string;
    @Column({name: "LIEU"})
    lieu: string;
}