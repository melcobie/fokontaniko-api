import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "REQUETE"})
export default class Requete{
    @PrimaryGeneratedColumn('increment', {name: "ID"})
    id: number;

    @Column({name: "TYPE"})
    typeRequete: string;

    @Column({name: "FRAIS"})
    frais: number;
}