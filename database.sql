-----------------------------------    Create user table   -----------------------------------------
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(1000),
    "password" VARCHAR(1000)
);

INSERT INTO "user" ("username", "password")
VALUES ('tiff', '1');

----------------------------------- Create medical_record table   -----------------------------------
CREATE TABLE "medical_record" (
    "id" SERIAL PRIMARY KEY,
    "birthdate" DATE,
    "microchip_id" VARCHAR(1000),
    "distemper" DATE,
    "rabies" DATE,
    "annual_checkup" DATE,
    "spay_neuter" BOOLEAN DEFAULT false
);
INSERT INTO "medical_record" ("birthdate", "microchip_id", "distemper", "rabies", "annual_checkup", "spay_neuter")
VALUES ('1-1-2011', 'no chip', '1-1-1996', '1-1-1996', '1-1-1996', false),
('5-1-2012', 'Check later', '1-1-1996', '1-1-1996', '1-1-1996', true);
---------------------------------   Create pet_info table.      ---------------------------------------

CREATE TABLE "pet_info" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "user_id" INTEGER REFERENCES "user"("id"),
    "medical_record_id" INTEGER REFERENCES "medical_record"("id")
);

INSERT INTO "pet_info" ("name", "user_id", "medical_record_id")
VALUES ('Max', 1, 1),
('Witten', 1, 2);



----------------------------------   Create pet_photo table  ----------------------------------------
CREATE TABLE "pet_photo" (
    "id" SERIAL PRIMARY KEY,
    "pet_info_id" INTEGER REFERENCES "pet_info"("id"),
    "photo_url" VARCHAR(1000)
);

INSERT INTO "pet_photo" ("pet_info_id", "photo_url")
VALUES ('1', '/Images/max.jpeg'),
('2', '/Images/witten.jpeg');



