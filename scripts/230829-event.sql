ALTER TABLE Evenement DROP COLUMN Presence;

ALTER TABLE Evenement ADD(
    lieu VARCHAR(50)
);

UPDATE Evenement SET lieu='Gymnase couvert Mahamasina';