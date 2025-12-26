import React from 'react';
import type { Movie } from '../../services/api';
import './MoviePreview.css';

interface MoviePreviewProps { 
    movie: Movie;
    onOpenDetails: (movie: Movie) => void;
}

const MoviePreview: React.FC<MoviePreviewProps> = React.memo(({ movie, onOpenDetails }) => {
    return (
        <article className="movie-preview">
            <h4 className="movie-preview__title">{movie.title} ({movie.year})</h4>
            <p className="movie-preview__info">
                <strong className="movie-preview__label">Режиссер:</strong> {movie.director}
            </p>
            <p className="movie-preview__info">
                <strong className="movie-preview__label">Рейтинг:</strong> ⭐ {movie.rating}
            </p>
            <button
                className="movie-preview__button"
                onClick={() => onOpenDetails(movie)}
                aria-label={`Открыть детали фильма ${movie.title}`}
            >
                Подробнее
            </button>
        </article>
    );
});

MoviePreview.displayName = 'MoviePreview';

export default MoviePreview;