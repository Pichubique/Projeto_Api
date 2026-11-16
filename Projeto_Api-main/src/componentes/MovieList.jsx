import Card from './Card'
import { useState, useEffect } from 'react'

export default function MovieList() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('spider man')

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim() === '') {
                setMovies([])
                setLoading(false)
                return
            }

            setLoading(true)

            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?s=${(query)}&apikey=65710bf0`
                )

                const data = await response.json()

                if (data.Response === 'True') {
                    setMovies(data.Search)
                } else {
                    setMovies([])
                }
            } catch (error) {
                console.error("Erro ao buscar filmes:", error)
                setMovies([])
            } finally {
                setLoading(false)
            }
        }, 800)

        return () => clearTimeout(delayDebounceFn)
    }, [query])

    return (
        <div className="card">
            <h2>Nível Médio: consumo de API OMDb com debounce</h2>
            <p>Busca filmes assim que você para de digitar.</p>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar filme..."
            />

            {loading ? (
                <p>Carregando filmes...</p>
            ) : movies.length > 0 ? (
                <div className="movie-list">
                    {movies.map((movie) => (
                       <Card 
                       key={movie.imdbID}
                       className='movieCard'
                       title={movie.Title}
                       mediaUrl={movie.Poster !== 'N/A' ? movie.Poster : null}
                       tags={[movie.Type]}
                       metadata={[
                        {label: 'Ano', value: movie.Year}
                       ]}
                       />
                    ))}
                </div>
            ) : (
                <p>Nenhum filme encontrado.</p>
            )}
        </div>
    )
}
