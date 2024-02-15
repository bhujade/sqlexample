
-- create table user(
--     id varchar(50) primary key,
--     username varchar(50) unique,
--     email varchar(50) unique not null,
--     password varchar(50) not null
-- );



create database data11;

use data11;
create table box(
id int primary key,
name varchar(50),
marks int(2)
);

create table user(
id int primary key,
name varchar(50),
email varchar(50) unique not null,
password varchar(50) unique not null
);

insert into box
(id , name ,marks)
values
(13,"virat",05);

select * from user;

alter table user
modify id varchar(50) ;

set sql_safe_updates = 0;