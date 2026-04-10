'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { getAllMoviesAdmin, deleteMovie, getStats } from '../../../lib/movies';

export default function AdminDashboard() {
    const router = useRouter();
    const [movies, setMovies] = useState([]);
    const [stats, setStats] = useState({});
    const [toast, setToast] = useState(null);

    useEffect(() => {
        // Check auth
        const auth = localStorage.getItem('candyzone_admin');
        if (!auth) {
            router.push('/admin');
            return;
        }
        loadData();
    }, []);

    const loadData = () => {
        setMovies(getAllMoviesAdmin());
        setStats(getStats());
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteMovie(id);
            loadData();
            showToast(`"${title}" deleted successfully`, 'success');
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem('candyzone_admin');
        router.push('/admin');
    };

    return (
        <>
            <Navbar />
            <div className="admin-layout">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-title">Admin Panel</div>
                    <nav className="admin-sidebar-nav">
                        <Link href="/admin/dashboard" className="admin-sidebar-link active">
                            📊 Dashboard
                        </Link>
                        <Link href="/admin/dashboard/add" className="admin-sidebar-link">
                            ➕ Add Movie
                        </Link>
                        <Link href="/" className="admin-sidebar-link">
                            🏠 View Site
                        </Link>
                        <button onClick={handleLogout} className="admin-sidebar-link" style={{ width: '100%', textAlign: 'left', background: 'none' }}>
                            🚪 Logout
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="admin-main">
                    <div className="admin-header">
                        <h1 className="admin-title">📊 Dashboard</h1>
                        <Link href="/admin/dashboard/add" className="btn btn-primary">
                            ➕ Add New Movie
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-card-label">Total Movies</div>
                            <div className="stat-card-value">{stats.total || 0}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-label">Published</div>
                            <div className="stat-card-value">{stats.published || 0}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-label">Total Views</div>
                            <div className="stat-card-value">{stats.totalViews ? `${(stats.totalViews / 1000).toFixed(0)}K` : '0'}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-card-label">Genres</div>
                            <div className="stat-card-value">{stats.genres || 0}</div>
                        </div>
                    </div>

                    {/* Movies Table */}
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Movie</th>
                                    <th>Genre</th>
                                    <th>Year</th>
                                    <th>Rating</th>
                                    <th>Status</th>
                                    <th>Views</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie) => (
                                    <tr key={movie.id}>
                                        <td>
                                            <div className="admin-table-movie">
                                                <div className="admin-table-poster">
                                                    <img src={movie.posterUrl} alt={movie.title} />
                                                </div>
                                                <div>
                                                    <div className="admin-table-title">{movie.title}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{movie.language}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{movie.genre.join(', ')}</td>
                                        <td>{movie.year}</td>
                                        <td>⭐ {movie.rating}</td>
                                        <td>
                                            <span className={movie.status === 'published' ? 'status-published' : 'status-draft'}>
                                                {movie.status === 'published' ? '● Published' : '○ Draft'}
                                            </span>
                                        </td>
                                        <td>{(movie.views / 1000).toFixed(1)}K</td>
                                        <td>
                                            <div className="admin-table-actions">
                                                <Link href={`/movie/${movie.id}`} className="btn btn-outline btn-sm">👁️</Link>
                                                <Link href={`/admin/dashboard/edit/${movie.id}`} className="btn btn-secondary btn-sm">✏️</Link>
                                                <button onClick={() => handleDelete(movie.id, movie.title)} className="btn btn-danger btn-sm">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.type === 'success' ? '✅' : '❌'} {toast.message}
                </div>
            )}
        </>
    );
}
