USE moviesDB;

drop procedure if exists search_genre;


DELIMITER //
create procedure search_genre(
	in genreS varchar(255)
)
begin
	select * from movie
    inner join movie_genres on movie.id = movie_genres.movie_id
    inner join genre on genre.id = movie_genres.genre_id
    where genre.name = genreS;
end;
//

select movie.id, movie. title, movie.year, movie.director, movie.duration, movie.rate, genre.name
from movie 
inner join movie_genres on movie.id = movie_genres.movie_id 
inner join genre on genre.id = movie_genres.genre_id 
where genre.name = 'drama';

select * from movie

delete from movie where title = 'Titanic';
