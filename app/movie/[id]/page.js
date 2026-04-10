import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import MovieCard from '../../../components/MovieCard';
import { getMovieById, getRelatedMovies } from '../../../lib/movies';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const movie = getMovieById(id);
    if (!movie) return { title: 'Movie Not Found — CandyZone' };
    return {
        title: `${movie.title} (${movie.year}) — CandyZone`,
        description: movie.description.slice(0, 160),
        openGraph: {
            title: `${movie.title} — CandyZone`,
            description: movie.description.slice(0, 160),
            images: [movie.posterUrl],
        },
    };
}

export default async function MovieDetailPage({ params }) {
    const { id } = await params;
    const movie = getMovieById(id);

    if (!movie) {
        notFound();
    }

    const relatedMovies = getRelatedMovies(id, 4);

    return (
        <>
            <Navbar />

            <div className="movie-detail">
                {/* Banner */}
                <div className="movie-detail-banner">
                    <div className="movie-detail-banner-bg">
                        <img src={movie.posterUrl} alt={movie.title} />
                    </div>
                    <div className="movie-detail-banner-gradient" />
                </div>

                {/* Content */}
                <div className="movie-detail-content">
                    <div className="movie-detail-layout">
                        {/* Poster */}
                        <div className="movie-detail-poster animate-fade-in">
                            <img src={movie.posterUrl} alt={movie.title} />
                        </div>

                        {/* Info */}
                        <div className="movie-detail-info animate-slide-up">
                            <h1 className="movie-detail-title">{movie.title}</h1>

                            {/* Genre Badges */}
                            <div className="movie-detail-genres">
                                {movie.genre.map((g) => (
                                    <Link key={g} href={`/search?genre=${g}`} className="badge badge-genre">{g}</Link>
                                ))}
                                {movie.isTrending && <span className="badge badge-trending">🔥 Trending</span>}
                            </div>

                            {/* Metadata */}
                            <div className="movie-detail-meta">
                                <div className="movie-detail-meta-item">
                                    <span className="movie-detail-meta-label">Rating</span>
                                    <span className="movie-detail-meta-value">⭐ {movie.rating}/10</span>
                                </div>
                                <div className="movie-detail-meta-item">
                                    <span className="movie-detail-meta-label">Release Year</span>
                                    <span className="movie-detail-meta-value">{movie.year}</span>
                                </div>
                                <div className="movie-detail-meta-item">
                                    <span className="movie-detail-meta-label">Language</span>
                                    <span className="movie-detail-meta-value">{movie.language}</span>
                                </div>
                                <div className="movie-detail-meta-item">
                                    <span className="movie-detail-meta-label">Duration</span>
                                    <span className="movie-detail-meta-value">{movie.duration}</span>
                                </div>
                                <div className="movie-detail-meta-item">
                                    <span className="movie-detail-meta-label">Director</span>
                                    <span className="movie-detail-meta-value">{movie.director}</span>
                                </div>
                                <div className="movie-detail-meta-item">
                                    <span className="movie-detail-meta-label">Views</span>
                                    <span className="movie-detail-meta-value">{(movie.views / 1000).toFixed(1)}K</span>
                                </div>
                            </div>

                            {/* Synopsis */}
                            <div className="movie-detail-synopsis">
                                <h3>📖 Synopsis</h3>
                                <p>{movie.description}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="movie-detail-actions">
                                {movie.watchLink && (
                                    <a href={movie.watchLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                                        ▶ Watch Online
                                    </a>
                                )}
                                {movie.downloadLink && (
                                    <a href={movie.downloadLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                                        ⬇️ Download
                                    </a>
                                )}
                                <a href={movie.telegramLink || "https://t.me/+BUfqOQU5YUc1ZTc1"} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                                    📨 Telegram
                                </a>
                            </div>

                            {/* Cast */}
                            <div className="movie-detail-cast">
                                <h3>🎭 Cast</h3>
                                <div className="movie-detail-cast-list">
                                    {movie.cast.map((actor) => (
                                        <span key={actor} className="movie-detail-cast-item">{actor}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Movies */}
                {relatedMovies.length > 0 && (
                    <section className="section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">🎬 You May Also Like</h2>
                            </div>
                            <div className="movie-grid">
                                {relatedMovies.map((m) => (
                                    <MovieCard key={m.id} movie={m} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </>
    );
}
