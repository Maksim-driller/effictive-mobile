import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchMovies } from '../../services/api';
import type { Movie } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import MoviePreview from '../MoviePreview/MoviePreview';
import MovieCard from '../MovieCard/MovieCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Search.css';

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const loadMovies = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchMovies();
            setMovies(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    const filteredMovies = useMemo(() => {
        if (!debouncedSearchTerm) return movies;

        const searchLower = debouncedSearchTerm.toLowerCase();
        return movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchLower) ||
            movie.director.toLowerCase().includes(searchLower)
        );
    }, [movies, debouncedSearchTerm]);

    const handleOpenMovieCard = useCallback((movie: Movie) => {
        setSelectedMovie(movie);
    }, []);

    const handleCloseMovieCard = useCallback(() => {
        setSelectedMovie(null);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <main className="movie-search">
            <section className="movie-search__search-section">
                <input
                    type="text"
                    placeholder="Поиск фильмов по названию или режиссеру..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="movie-search__input"
                    aria-label="Поиск фильмов"
                />
            </section>

            {isLoading && <LoadingSpinner />}

            {error && !isLoading && (
                <ErrorMessage message={error} onRetry={loadMovies} />
            )}

            {!isLoading && !error && (
                <section className="movie-search__results" aria-label="Результаты поиска">
                    <h3 className="movie-search__title">
                        {filteredMovies.length > 0
                            ? `Каталог Фильмов (найдено: ${filteredMovies.length})`
                            : 'Фильмы не найдены'
                        }
                    </h3>
                    {filteredMovies.length > 0 && (
                        <div className="movie-search__grid">
                            {filteredMovies.map((movie) => (
                                <MoviePreview
                                    key={movie.id}
                                    movie={movie}
                                    onOpenDetails={handleOpenMovieCard}
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {selectedMovie && (
                <MovieCard
                    movie={selectedMovie}
                    onClose={handleCloseMovieCard}
                />
            )}
        </main>
    );
}

export default Search;