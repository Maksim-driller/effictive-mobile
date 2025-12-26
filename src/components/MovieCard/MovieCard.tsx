import React, { useEffect, useCallback } from 'react';
import type { Movie } from '../../services/api';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
    onClose: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClose }) => {
    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className="movie-card"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-card-title"
        >
            <div className="movie-card__content">
                <button
                    className="movie-card__close-button"
                    onClick={onClose}
                    aria-label="Закрыть окно"
                >
                    ×
                </button>

                <header className="movie-card__header">
                    <h2 id="movie-card-title" className="movie-card__title">
                        {movie.title} ({movie.year})
                    </h2>
                    <div className="movie-card__rating">
                        ⭐ {movie.rating}/10
                    </div>
                </header>

                <div className="movie-card__body">
                    <div className="movie-card__poster-wrapper">
                        <img
                            className="movie-card__poster"
                            src={movie.poster}
                            alt={`Постер фильма ${movie.title}`}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+poster';
                            }}
                        />
                    </div>

                    <div className="movie-card__details">
                        <p className="movie-card__info">
                            <strong className="movie-card__label">Режиссер:</strong> {movie.director}
                        </p>
                        <p className="movie-card__info">
                            <strong className="movie-card__label">Длительность:</strong> {movie.duration} мин.
                        </p>
                        <p className="movie-card__info">
                            <strong className="movie-card__label">Жанр:</strong> {movie.genre.join(', ')}
                        </p>
                        <p className="movie-card__info">
                            <strong className="movie-card__label">Актеры:</strong> {movie.actors.join(', ')}
                        </p>

                        <div className="movie-card__description">
                            <h4 className="movie-card__description-title">Описание:</h4>
                            <p className="movie-card__description-text">{movie.description}</p>
                        </div>
                    </div>
                </div>

                <footer className="movie-card__footer">
                    <button
                        className="movie-card__footer-button"
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default MovieCard;