import Link from 'next/link';

export default function MovieCard({ movie }) {
    return (
        <Link href={`/movie/${movie.id}`} className="movie-card" id={`movie-card-${movie.id}`}>
            <div className="movie-card-poster">
                <img src={movie.posterUrl} alt={movie.title} loading="lazy" />

                <div className="movie-card-badges">
                    {movie.isTrending && <span className="badge badge-trending">🔥 Trending</span>}
                    {movie.year >= 2026 && <span className="badge badge-new">NEW</span>}
                </div>

                <div className="movie-card-rating">
                    ⭐ {movie.rating}
                </div>

                <div className="movie-card-overlay">
                    <span className="btn btn-primary btn-sm">▶ View Details</span>
                </div>
            </div>

            <div className="movie-card-info">
                <div className="movie-card-title">{movie.title}</div>
                <div className="movie-card-meta">
                    <span>📅 {movie.year}</span>
                    <span>•</span>
                    <span>{movie.genre[0]}</span>
                    {movie.duration && (
                        <>
                            <span>•</span>
                            <span>⏱ {movie.duration}</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}
