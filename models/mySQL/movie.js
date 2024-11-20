import mysql from 'mysql2/promise'

const config = {
    host: 'localHost',
    user: 'jorge.romero',
    //port: 3306,
    password: '1234',
    database: 'moviesDB'
}

const connection = await mysql.createConnection(config)

export class MovieModel{
    static async getAll ({genre}){
        if(genre){
            const lowerCaseGenre = genre.toLowerCase()
            const [genres] = await connection.query(
                `select movie.id, movie. title, movie.year, movie.director, movie.duration, movie.poster, movie.rate, genre.name as genre
                from movie 
                inner join movie_genres on movie.id = movie_genres.movie_id 
                inner join genre on genre.id = movie_genres.genre_id 
                where lower(genre.name) = ?`, [lowerCaseGenre]
            )
            return genres
            if (genres.length === 0) return []
        }
        const [movies] = await connection.query(
            'SELECT * FROM movie'
        )
        return movies
    }

    static async getById({id}){
        const [movie] = await connection.query(
            `select * from movie where id = ?`, [id]
        )
        if (movie.length === 0){
            return []
        } else {
            return movie
        }
    }

    static async create ({input}){
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        const result = await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
                (UUID(), ?, ?, ?, ?, ?, ?)`, 
                [title, year, director, duration, poster, rate]
        )
        
        genreInput.forEach(async (genre) => {
            const genreResult = await connection.query(
                `INSERT INTO movie_genres (movie_id, genre_id) 
                    VALUES ((SELECT id FROM movie WHERE title = ?), (SELECT id FROM genre WHERE name = ?))`,[title, genre]
            )
        })

        return input
    }

    static async delete ({id}){
       
    }

    static async update ({id, input}){
        
    }
}