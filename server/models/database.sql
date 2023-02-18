
create TABLE user_model(
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(30) NOT NULL,
    isActivated BOOLEAN NOT NULL DEFAULT TRUE,
    activationLink VARCHAR(255)
);

create TABLE token_model(
     userId INT NOT NULL,
     refreshToken VARCHAR(255) NOT NULL,
);