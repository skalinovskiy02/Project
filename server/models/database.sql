
create TABLE user_model(
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(120) NOT NULL,
    password        VARCHAR(30) NOT NULL,
    isActivated     BOOLEAN NOT NULL DEFAULT TRUE,
    activationLink  VARCHAR(255)
);

create TABLE token_model(
     userId       INT NOT NULL,
     refreshToken VARCHAR(255) NOT NULL,
);

create TABLE flat_model(
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    type        TEXT NOT NULL,
    address     TEXT NOT NULL,
    price       INT NOT NULL,
    photos      TEXT[] NOT NULL,
    description TEXT NOT NULL,
    coordinates REAL[2] NOT NULL,
    owner       INT NOT NULL,
    active      BOOLEAN,
    rating      REAL
);

create TABLE comment_model(
    id          SERIAL PRIMARY KEY,
    userid      INT NOT NULL,
    flatid      INT NOT NULL,
    text        TEXT NOT NULL,
    date        DATE NOT NULL,
    rate        INT NOT NULL
);

CREATE TABLE order_model
(
    id          SERIAL PRIMARY KEY,
    userid      integer NOT NULL,
    owner       integer NOT NULL,
    flatid      integer NOT NULL,
    dates       date[] NOT NULL,
    cost        integer NOT NULL
);

CREATE OR REPLACE FUNCTION get_nearest_flats(point REAL[2], lim INTEGER) RETURNS TABLE (
    id INTEGER,
    title TEXT,
	type TEXT,
	address TEXT,
    price INTEGER,
    photos TEXT[],
	description TEXT,
	coordinates REAL[2],
	owner INTEGER,
	active BOOLEAN,
	rating REAL,
	distance double precision
)
AS $$
BEGIN
	RETURN query (SELECT *,
				  CASE
				  	WHEN sqrt(pow(abs(flats.coordinates[1] - point[1]), 2) + pow(abs(flats.coordinates[2] - point[2]), 2)) > 180 THEN 360 - sqrt(pow(abs(flats.coordinates[1] - point[1]), 2) + pow(abs(flats.coordinates[2] - point[2]), 2))
				  	ELSE sqrt(pow(abs(flats.coordinates[1] - point[1]), 2) + pow(abs(flats.coordinates[2] - point[2]), 2))
				  END
				  as distance
				  FROM flats
				  ORDER BY distance
				  LIMIT lim
				 );
END;
$$ LANGUAGE plpgsql;