import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Citoyen from "./Citoyen";
import Requete from "./Requete";

@Entity({name: "REQUETECITOYEN"})
export default class RequeteCitoyen{
    @PrimaryGeneratedColumn('increment', {name: "ID"})
    id: number;

    @Column({name: "DATEREQUETE"})
    DateRequete: Date;

    @Column({name: "STATUS", 
        type: 'number',
        transformer: {
            from: (value: number) => value === 1,
            to: (value: boolean) => (value ? 1 : 0),
        }
    })
    status: boolean;

    @ManyToOne(()=>Citoyen)
    @JoinColumn({name: "CITOYENID"})
    citoyen: Citoyen;

    @ManyToOne(()=>Requete)
    @JoinColumn({name: "REQUETEID"})
    requete: Requete;

    
    @Column({name: 'PRIX'})
    prix: number;

    @Column({name: "QUANTITE"})
    quantite: number;

    @Column({name: "LIBELLE"})
    libelle: string;
}