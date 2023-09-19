create table users
(
    id       int auto_increment
        primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    constraint users_username_uindex
        unique (username)
);
