import Link from 'next/link';

export default function HeroBanner({ movie }) {
    if (!movie) return null;

    return (
        <section className="hero" id="hero-banner">
            <div className="hero-bg">
                <img src={movie.posterUrl} alt={movie.title} />
            </div>
            <div className="hero-gradient" />

            <div className="hero-content container animate-slide-up">
                <div className="hero-badge">
                    <span className="badge badge-trending">⚡ Featured Movie</span>
                </div>

                <h1 className="hero-title">{movie.title}</h1>

                <div className="hero-meta">
                    <span className="hero-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {movie.duration}
                    </span>
                    <span className="hero-meta-item">⭐ {movie.rating}/10</span>
                    <span className="hero-meta-item">📅 {movie.year}</span>
                    <span className="hero-meta-item">🌐 {movie.language}</span>
                </div>

                <p className="hero-description">
                    {movie.description.length > 200 ? movie.description.slice(0, 200) + '...' : movie.description}
                </p>

                <div className="hero-actions">
                    <Link href={`/movie/${movie.id}`} className="btn btn-primary btn-lg">
                        ▶ Watch Now
                    </Link>
                    <Link href={`/movie/${movie.id}`} className="btn btn-secondary btn-lg">
                        ℹ️ More Info
                    </Link>
                </div>
            </div>
        </section>
    );
}
