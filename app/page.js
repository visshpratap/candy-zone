import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';
import { getFeaturedMovie, getTrendingMovies, getMovies, GENRES } from '../lib/movies';

export default function HomePage() {
    const featured = getFeaturedMovie();
    const trending = getTrendingMovies(8);
    const { movies: latestMovies } = getMovies({ limit: 12, sort: 'latest' });

    return (
        <>
            <Navbar />

            {/* Hero Banner */}
            <HeroBanner movie={featured} />

            {/* Trending Section */}
            <section className="section" id="trending-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">🔥 Trending Now</h2>
                        <a href="/search?sort=views" className="section-link">
                            View All →
                        </a>
                    </div>
                    <div className="trending-scroll">
                        {trending.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Genre Filter + Latest Movies */}
            <section className="section" id="latest-movies">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">🎬 Latest Movies</h2>
                    </div>

                    <GenreFilter genres={GENRES} />

                    <div className="movie-grid" style={{ marginTop: '24px' }}>
                        {latestMovies.map((movie, index) => (
                            <div key={movie.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>

                    <div className="load-more-wrapper" style={{ marginTop: '32px' }}>
                        <a href="/search" className="btn btn-secondary btn-lg">
                            Browse All Movies →
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-card-label">Total Movies</div>
                            <div className="stat-card-value">12+</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-label">Genres</div>
                            <div className="stat-card-value">13</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-label">Total Views</div>
                            <div className="stat-card-value">1.5M+</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-label">Languages</div>
                            <div className="stat-card-value">8</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
