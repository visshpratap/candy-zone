'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MovieCard from '../../components/MovieCard';
import { getMovies, GENRES, YEARS, LANGUAGES } from '../../lib/movies';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const q = searchParams.get('q') || '';
    const genre = searchParams.get('genre') || 'All';
    const year = searchParams.get('year') || '';
    const sort = searchParams.get('sort') || 'latest';

    const [searchInput, setSearchInput] = useState(q);

    const { movies, total } = getMovies({
        search: q,
        genre: genre !== 'All' ? genre : undefined,
        year: year || undefined,
        sort,
    });

    const updateParams = (newParams) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        router.push(`/search?${params.toString()}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        updateParams({ q: searchInput });
    };

    return (
        <div className="search-page">
            <div className="container">
                {/* Search Header */}
                <div className="search-header">
                    <h1 className="search-title">
                        {q ? (
                            <>Results for <span>"{q}"</span></>
                        ) : genre !== 'All' ? (
                            <>Browse <span>{genre}</span> Movies</>
                        ) : (
                            <>Browse <span>All</span> Movies</>
                        )}
                    </h1>
                    <p className="search-count">{total} movie{total !== 1 ? 's' : ''} found</p>
                </div>

                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} style={{ marginBottom: '24px' }}>
                    <div className="navbar-search" style={{ maxWidth: '100%' }}>
                        <span className="navbar-search-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by title, director, cast..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </form>

                {/* Filters */}
                <div className="search-filters">
                    <select
                        value={genre}
                        onChange={(e) => updateParams({ genre: e.target.value === 'All' ? '' : e.target.value })}
                    >
                        {GENRES.map((g) => (
                            <option key={g} value={g}>{g === 'All' ? '🎭 All Genres' : g}</option>
                        ))}
                    </select>

                    <select
                        value={year}
                        onChange={(e) => updateParams({ year: e.target.value })}
                    >
                        <option value="">📅 All Years</option>
                        {YEARS.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => updateParams({ sort: e.target.value })}
                    >
                        <option value="latest">🕐 Latest First</option>
                        <option value="rating">⭐ Highest Rated</option>
                        <option value="views">🔥 Most Viewed</option>
                        <option value="title">🔤 A-Z</option>
                    </select>
                </div>

                {/* Genre Chips */}
                <div className="genre-filter" style={{ marginBottom: '32px' }}>
                    {GENRES.map((g) => (
                        <button
                            key={g}
                            className={`genre-chip ${genre === g ? 'active' : ''}`}
                            onClick={() => updateParams({ genre: g === 'All' ? '' : g })}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                {/* Results Grid */}
                {movies.length > 0 ? (
                    <div className="movie-grid">
                        {movies.map((movie, index) => (
                            <div key={movie.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🎬</div>
                        <div className="empty-state-title">No movies found</div>
                        <p className="empty-state-text">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={
                <div className="search-page">
                    <div className="container">
                        <div className="loading-center"><div className="spinner"></div></div>
                    </div>
                </div>
            }>
                <SearchContent />
            </Suspense>
            <Footer />
        </>
    );
}
