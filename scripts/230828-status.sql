DROP TABLE RequeteCitoyen;

CREATE TABLE RequeteCitoyen (
    id number(8) GENERATED BY DEFAULT ON NULL AS IDENTITY constraint pk_requetecitoyen_id primary key,
    CitoyenID number(8) NOT NULL,
    RequeteID number(8) NOT NULL,
    FOREIGN KEY(CitoyenID) REFERENCES Citoyen(id),
    FOREIGN KEY(RequeteID) REFERENCES Requete(id),
    DateRequete date NOT NULL,
    status number(1),
    CHECK(status in (0, 1))
);

ALTER TABLE Citoyen DROP COLUMN Actif;

ALTER TABLE Citoyen ADD(
    Actif number(1),
    CHECK(Actif in (0,1))
);

UPDATE Citoyen SET Actif=1;