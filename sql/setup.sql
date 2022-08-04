-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists books_authors;
drop table if exists books;
drop table if exists authors;


create table authors (
  id bigint generated always as identity primary key,
  name varchar not null,
  --  datatype required string
  dob varchar,
  -- datatype date of birth integer
  pob varchar
  -- datatype place of birth string
);

create table books (
  id bigint generated always as identity primary key,
  title varchar not null,
  -- datatype required string
  author_name varchar not null,
  released varchar not null
  -- datatype 4 digit year required integer
);

create table books_authors (
  id bigint generated always as identity,
  -- no primary key necessary
  author_id bigint,
  book_id bigint,
  -- we need this datatype bigint to match the bigint ids in authors and books
  foreign key (author_id) references authors(id),
  foreign key (book_id) references books(id)
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

  insert into books_authors (
    author_id, book_id
  )
  values
  (1,1),
  (1,2),
  (2,3),
  (2,4),
  (3,5);
