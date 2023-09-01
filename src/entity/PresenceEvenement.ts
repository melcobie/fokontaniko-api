import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import Foyer from "./Foyer";
import Evenement from "./Evenement";

@Entity({name: "PRECENCEEVENEMENT"})
@Unique(['foyerId','evenementId'])
export default class PresenceEvenement {
    @ManyToOne(()=>Foyer)
    @JoinColumn({name: "FOYERID"})
    foyer: Foyer;

    @PrimaryColumn({name: "FOYERID"})
    foyerId: number;

    @ManyToOne(()=>Evenement)
    @JoinColumn({name: "EVENEMENTID"})
    evenement: Evenement;

    @PrimaryColumn({name: "EVENEMENTID"})
    evenementId: number;
   
    @Column({name: "DATEPRESENCE"})
    datePresence: Date;
}