ALTER TABLE RequeteCitoyen ADD (
    status char NOT NULL,
    CHECK(status in ('T', 'F'))
);

ALTER TABLE Requete MODIFY (
    typeRequete varchar2(50)
);

insert into Requete (typeRequete, Frais) values ('Certificat de résidence', 500);
insert into Requete (typeRequete, Frais) values ('Carte d''élection', 5000);
