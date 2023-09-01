ALTER TABLE Requete RENAME COLUMN TypeRequete to Type;

ALTER TABLE RequeteCitoyen ADD (
    prix number,
    quantite number
);

ALTER TABLE Impot RENAME TO ImpotFoyer;

ALTER TABLE Foyer ADD (
    actif number(1),
    CHECK(actif in (0,1))
);

UPDATE Foyer SET actif=1;