import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Citoyen from "./Citoyen";
import Users from "./Users";

@Entity({name: 'FOYER'})
export default class Foyer{
    @PrimaryGeneratedColumn('increment', {name: "ID"})
    id: number;
    @Column('varchar', {unique: true, name: 'ADRESSE'})
    adresse: string;
    @Column("number",{name: 'LONGITUDE'})
    longitude;
    @Column("number",{name: 'LATITUDE'})
    latitude;

    @ManyToOne(()=>Citoyen)
    @JoinColumn({name: 'CHEFFOYER'})
    chefFoyer: Citoyen;

    @OneToMany(()=>Citoyen, (citoyen) => citoyen.foyer)
    membres: Citoyen[];

    @OneToMany(()=>Users, (user)=> user.foyer)
    user: Users[];

    @Column({name: "ACTIF",
    type: 'number',
    transformer: {
        from: (value: number) => value === 1,
        to: (value: boolean) => (value ? 1 : 0),
    }})
    actif: boolean;
}
