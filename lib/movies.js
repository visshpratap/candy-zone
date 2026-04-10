// Movie data access layer
// Uses local seed data for demo, swap to Firebase for production

import { seedMovies, generateId, GENRES, YEARS, LANGUAGES } from './seed-data';

// In-memory store (simulates database)
let movies = [...seedMovies];

export { GENRES, YEARS, LANGUAGES };

// Get all movies with optional filters
export function getMovies({ search, genre, year, limit, offset = 0, sort = 'latest' } = {}) {
    let filtered = movies.filter(m => m.status === 'published');

    if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(m =>
            m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.director.toLowerCase().includes(q) ||
            m.cast.some(c => c.toLowerCase().includes(q))
        );
    }

    if (genre && genre !== 'All') {
        filtered = filtered.filter(m => m.genre.includes(genre));
    }

    if (year) {
        filtered = filtered.filter(m => m.year === parseInt(year));
    }

    // Sort
    if (sort === 'latest') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'views') {
        filtered.sort((a, b) => b.views - a.views);
    } else if (sort === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    const total = filtered.length;
    if (limit) {
        filtered = filtered.slice(offset, offset + limit);
    }

    return { movies: filtered, total };
}

// Get single movie by ID
export function getMovieById(id) {
    return movies.find(m => m.id === id) || null;
}

// Get trending movies
export function getTrendingMovies(limit = 8) {
    return movies
        .filter(m => m.isTrending && m.status === 'published')
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
}

// Get featured movie (for hero banner)
export function getFeaturedMovie() {
    return movies.find(m => m.isFeatured && m.status === 'published') || movies[0];
}

// Get related movies (same genre, different movie)
export function getRelatedMovies(movieId, limit = 4) {
    const movie = getMovieById(movieId);
    if (!movie) return [];
    return movies
        .filter(m => m.id !== movieId && m.status === 'published' && m.genre.some(g => movie.genre.includes(g)))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

// Get all movies (admin - includes drafts)
export function getAllMoviesAdmin() {
    return [...movies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Create movie
export function createMovie(data) {
    const movie = {
        ...data,
        id: generateId(),
        views: 0,
        createdAt: new Date().toISOString().split('T')[0],
    };
    movies.unshift(movie);
    return movie;
}

// Update movie
export function updateMovie(id, data) {
    const index = movies.findIndex(m => m.id === id);
    if (index === -1) return null;
    movies[index] = { ...movies[index], ...data };
    return movies[index];
}

// Delete movie
export function deleteMovie(id) {
    const index = movies.findIndex(m => m.id === id);
    if (index === -1) return false;
    movies.splice(index, 1);
    return true;
}

// Get stats
export function getStats() {
    const published = movies.filter(m => m.status === 'published').length;
    const draft = movies.filter(m => m.status === 'draft').length;
    const totalViews = movies.reduce((acc, m) => acc + m.views, 0);
    const genres = [...new Set(movies.flatMap(m => m.genre))];
    return { total: movies.length, published, draft, totalViews, genres: genres.length };
}
