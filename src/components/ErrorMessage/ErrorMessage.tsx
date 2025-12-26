import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="error-message" role="alert" aria-live="assertive">
            <div className="error-message__icon">⚠️</div>
            <h3 className="error-message__title">Произошла ошибка</h3>
            <p className="error-message__text">{message}</p>
            {onRetry && (
                <button
                    className="error-message__button"
                    onClick={onRetry}
                    aria-label="Попробовать загрузить данные снова"
                >
                    Попробовать снова
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;