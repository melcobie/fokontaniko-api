import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import Foyer from "./Foyer";

@Entity({name: "IMPOTFOYER"})
@Unique(['annee','mois','foyerId'])
export default class Impot{
    @PrimaryGeneratedColumn('increment', {name: "ID"})
    id: number;

    @Column({name: "ANNEE", nullable: false})
    @Check("ANNEE > 2020")
    annee: number;

    @Column({name: "MOIS", nullable: false})
    @Check("MOIS between 1 and 12")
    mois: number;

    
    @ManyToOne(()=>Foyer)
    @JoinColumn({name: "FOYERID"})
    foyer: Foyer;

    @Column({name: 'FOYERID'})
    foyerId: number;

    @Column({name: "DATEPAIEMENT"})
    datePaiement: Date;
}