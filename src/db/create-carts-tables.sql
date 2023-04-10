CREATE TYPE status AS ENUM ('OPEN', 'ORDERED');

create extension if not exists "uuid-ossp";

create table carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid default uuid_generate_v4(),
	created_at date not null,
    updated_at date not null,
    status status
);

create table cart_items (
	cart_id uuid,
	product_id uuid primary key default uuid_generate_v4(),
    count integer,
    foreign key ("cart_id") references "carts" ("id")
);

insert into carts (created_at, updated_at, status) values
('2023-04-09 18:22:15', '2023-04-10 18:22:15', 'OPEN'),
('2023-04-09 18:22:15', '2023-04-10 18:22:15', 'ORDERED');

insert into cart_items (cart_id, count) values
('c7f413e1-c37d-471b-b47f-1d86cc17a4d4', '2'),
('1ec48582-2e68-4328-8fa0-5c5e7a3c6e06', '3');