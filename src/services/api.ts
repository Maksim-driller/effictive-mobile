const API_URL = 'http://localhost:3001';

export interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string[];
    director: string;
    duration: number;
    rating: number;
    description: string;
    poster: string;
    actors: string[];
}

export class ApiError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export const fetchMovies = async (): Promise<Movie[]> => {
    try {
        const response = await fetch(`${API_URL}/movies`);

        if (!response.ok) {
            throw new ApiError(
                `Ошибка при загрузке данных: ${response.statusText}`,
                response.status
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        if (error instanceof TypeError) {
            throw new ApiError('Не удалось подключиться к серверу. Проверьте подключение к интернету.');
        }

        throw new ApiError('Произошла неизвестная ошибка при загрузке данных');
    }
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/movies/${id}`);

        if (!response.ok) {
            throw new ApiError(
                `Фильм не найден`,
                response.status
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        if (error instanceof TypeError) {
            throw new ApiError('Не удалось подключиться к серверу. Проверьте подключение к интернету.');
        }

        throw new ApiError('Произошла неизвестная ошибка при загрузке фильма');
    }
};