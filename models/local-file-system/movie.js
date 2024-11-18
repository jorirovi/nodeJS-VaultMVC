import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const ruta = './movies.json'
const movies = readJSON(ruta)

export class MovieModel {
    static async getAll ({genre}) {
        if(genre){
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }

    static async getById ({id}) {
        const movie = movies.find(m => m.id === id)
        return movie
    }

    static async create ({input}) {
        const newMovie = {
            id: randomUUID(),
            ...input
        }

        movies.push(newMovie)
        return newMovie
    }

    static async update ({id, input}){
        const movieIndex = movies.findIndex(m => m.id === id)
        if(movieIndex === -1) return false
        
        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }

        return movies[movieIndex]
    }

    static async delete ({id}){
        const movieIndex = movies.findIndex(m => m.id === id)
        if (movieIndex === -1) return false

        movies.splice(movieIndex, 1)
        return true
    }
}