import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner" role="status" aria-live="polite">
            <div className="loading-spinner__circle"></div>
            <p className="loading-spinner__text">Загрузка фильмов...</p>
        </div>
    );
};

export default LoadingSpinner;