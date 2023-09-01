import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import Foyer from "./Foyer";

@Entity({name: "CITOYEN"})
export default class Citoyen{
    @PrimaryGeneratedColumn('increment', {name: "ID"})
    id: number;

    @Column({nullable: false, name: "NOM"})
    nom: string;

    @Column({name: "PRENOMS"})
    prenoms: string;

    @Column({nullable: false, name: "DATENAISSANCE"})
    dateNaissance: Date;

    @Column({nullable: false,name: "LIEUNAISSANCE"})
    lieuNaissance: string;

    @Column({nullable: false, name: "SEXE"})
    sexe: string; 

    @Column({name: "CIN"})
    CIN: string;

    @Column({name: "DATECIN"})
    dateCIN: Date;

    @Column({name: "LIEUCIN"})
    lieuCIN: string;

    @Column({name: "METIER"})
    metier: string;

    @Column({name: "NOMPERE"})
    nomPere: string;

    @Column({name: "NOMMERE"})
    nomMere: string;

    @Column({name: "DATEINSCRIPTION"})
    dateInscription:  Date;

    @Column({name: "ACTIF",
    type: 'number',
    transformer: {
        from: (value: number) => value === 1,
        to: (value: boolean) => (value ? 1 : 0),
    }})
    actif: boolean;

    @ManyToOne(()=>Foyer, (foyer)=>foyer.membres)
    @JoinColumn({name: 'FOYERID'})
    foyer: Foyer;
}