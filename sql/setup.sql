-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

drop table if exists books;
drop table if exists authors;

create table authors (
  id bigint generated always as identity,
  name varchar not null,
  --  datatype required string
  dob varchar,
  -- datatype date of birth integer
  pob varchar
  -- datatype place of birth string
);

create table books (
  id bigint generated always as identity,
  title varchar not null,
  -- datatype required string
  author_name varchar not null,
  released varchar not null
  -- datatype 4 digit year required integer
);

insert into authors (
  name, dob, pob
  )
  values
  ('Elizabeth Gilbert', 'July 18, 1969', 'Waterbury, CT'),
  ('Jonathan Stroud', 'October 27, 1970', 'Bedford, UK'),
  ('Plato', '424 BC', 'Athens, Greece');

  insert into books (
    title, author_name, released
  )
  values
  ('Eat Pray Love', 'Elizabeth Gilbert', 2006),
  ('City of Girls', 'Elizabeth Gilbert', 2019),
  ('The Screaming Staircase', 'Jonathan Stroud', 2013),
  ('The Amulet of Samarkand', 'Jonathan Stroud', 2003),
  ('The Republic', 'Plato', 375);
