import z from 'zod'

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie tittle must be a string',
        required_error: 'Movie title is required.'
    }),
    year: z.number().int().min(1900).max(2026),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Romance']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum genre.'
        }
    )
})

export function validateMovie (input) {
    return movieSchema.safeParse(input)
}

export function validatePartialMovie(input){
    return movieSchema.partial().safeParse(input)
}