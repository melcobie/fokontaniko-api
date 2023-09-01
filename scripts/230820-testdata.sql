ALTER TABLE Foyer MODIFY (
    Adresse varchar2(50)
);

INSERT INTO Foyer VALUES(
    NULL,
    'Lot II G 3 D bis',
    -18.90266,
    47.56879,
    NULL
);

INSERT INTO Citoyen VALUES(
    NULL,
    'Rakotoasimbola', 'Lalaina', to_date('2001-09-21', 'yyyy-MM-dd'), 'Antananarivo', 'Homme', 
    '000000000000', to_date('2021-09-21', 'yyyy-MM-dd'), 'Anatananarivo V',
    'Étudiant','Rakotoasimbola', 'Ramahazomanana',
    to_date('2023-08-20', 'yyyy-mm-dd'),
    1, 'T'
);

UPDATE Foyer Set ChefFoyer=1 WHERE ID=1;

-- password = md5('123456')
INSERT INTO Users VALUES (NULL, 'admin@gmail.com', '$2y$10$Kw48BrLxTxVeFv2KUuWB1eZV1WjMDwj2eDOAGVodhas8zoKw474KG', 'ADMIN', NULL);
INSERT INTO Users VALUES (NULL, 'user1@gmail.com', '$2y$10$Kw48BrLxTxVeFv2KUuWB1eZV1WjMDwj2eDOAGVodhas8zoKw474KG', 'NORMAL', NULL);