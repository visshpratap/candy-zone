'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import { createMovie, GENRES, YEARS, LANGUAGES } from '../../../../lib/movies';

export default function AddMoviePage() {
    const router = useRouter();
    const [toast, setToast] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        genre: [],
        year: 2026,
        language: 'English',
        duration: '',
        rating: 7.0,
        posterUrl: '/posters/neon-horizon.svg',
        releaseDate: '',
        director: '',
        cast: '',
        watchLink: '',
        downloadLink: '',
        telegramLink: '',
        isTrending: false,
        isFeatured: false,
        status: 'published',
    });

    useEffect(() => {
        const auth = localStorage.getItem('candyzone_admin');
        if (!auth) {
            router.push('/admin');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const toggleGenre = (genre) => {
        if (genre === 'All') return;
        setForm((prev) => ({
            ...prev,
            genre: prev.genre.includes(genre)
                ? prev.genre.filter((g) => g !== genre)
                : [...prev.genre, genre],
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPosterPreview(reader.result);
                setForm((prev) => ({ ...prev, posterUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title || !form.description || form.genre.length === 0) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        const movieData = {
            ...form,
            cast: form.cast.split(',').map((c) => c.trim()).filter(Boolean),
            rating: parseFloat(form.rating),
            year: parseInt(form.year),
        };

        createMovie(movieData);
        showToast(`"${form.title}" has been published! 🎬`, 'success');

        setTimeout(() => {
            router.push('/admin/dashboard');
        }, 1500);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const availableGenres = GENRES.filter((g) => g !== 'All');

    return (
        <>
            <Navbar />
            <div className="admin-layout">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-title">Admin Panel</div>
                    <nav className="admin-sidebar-nav">
                        <Link href="/admin/dashboard" className="admin-sidebar-link">📊 Dashboard</Link>
                        <Link href="/admin/dashboard/add" className="admin-sidebar-link active">➕ Add Movie</Link>
                        <Link href="/" className="admin-sidebar-link">🏠 View Site</Link>
                    </nav>
                </aside>

                <main className="admin-main">
                    <div className="admin-header">
                        <h1 className="admin-title">➕ Add New Movie</h1>
                        <Link href="/admin/dashboard" className="btn btn-outline">← Back to Dashboard</Link>
                    </div>

                    <form className="admin-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            {/* Title */}
                            <div className="form-group">
                                <label className="form-label">Movie Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-input"
                                    placeholder="Enter movie title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Year */}
                            <div className="form-group">
                                <label className="form-label">Release Year *</label>
                                <select name="year" className="form-select" value={form.year} onChange={handleChange}>
                                    {YEARS.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="form-group full-width">
                                <label className="form-label">Description / Synopsis *</label>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    placeholder="Write a compelling movie description..."
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Genres */}
                            <div className="form-group full-width">
                                <label className="form-label">Genres * (click to select)</label>
                                <div className="genre-select">
                                    {availableGenres.map((genre) => (
                                        <span
                                            key={genre}
                                            className={`genre-select-item ${form.genre.includes(genre) ? 'selected' : ''}`}
                                            onClick={() => toggleGenre(genre)}
                                        >
                                            {form.genre.includes(genre) ? '✓ ' : ''}{genre}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Language */}
                            <div className="form-group">
                                <label className="form-label">Language</label>
                                <select name="language" className="form-select" value={form.language} onChange={handleChange}>
                                    {LANGUAGES.map((l) => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Duration */}
                            <div className="form-group">
                                <label className="form-label">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    className="form-input"
                                    placeholder="e.g., 2h 15min"
                                    value={form.duration}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Rating */}
                            <div className="form-group">
                                <label className="form-label">Rating (0-10)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    className="form-input"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={form.rating}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Director */}
                            <div className="form-group">
                                <label className="form-label">Director</label>
                                <input
                                    type="text"
                                    name="director"
                                    className="form-input"
                                    placeholder="Director name"
                                    value={form.director}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Cast */}
                            <div className="form-group full-width">
                                <label className="form-label">Cast (comma separated)</label>
                                <input
                                    type="text"
                                    name="cast"
                                    className="form-input"
                                    placeholder="Actor 1, Actor 2, Actor 3"
                                    value={form.cast}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Release Date */}
                            <div className="form-group">
                                <label className="form-label">Release Date</label>
                                <input
                                    type="date"
                                    name="releaseDate"
                                    className="form-input"
                                    value={form.releaseDate}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Status */}
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>

                            {/* Poster Upload */}
                            <div className="form-group full-width">
                                <label className="form-label">Movie Poster</label>
                                {posterPreview ? (
                                    <div className="image-preview">
                                        <img src={posterPreview} alt="Poster preview" />
                                        <button
                                            type="button"
                                            className="image-preview-remove"
                                            onClick={() => {
                                                setPosterPreview(null);
                                                setForm((prev) => ({ ...prev, posterUrl: '/posters/neon-horizon.svg' }));
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <label className="image-upload">
                                        <div className="image-upload-icon">📸</div>
                                        <div className="image-upload-text">
                                            <strong>Click to upload</strong> or drag and drop<br />
                                            PNG, JPG, WebP (max 5MB)
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                )}
                            </div>

                            {/* External Links Section */}
                            <div className="form-group full-width" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '8px' }}>
                                <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
                                    🔗 External Links
                                </h3>
                            </div>

                            {/* Watch Link */}
                            <div className="form-group">
                                <label className="form-label">Watch Online URL</label>
                                <input
                                    type="url"
                                    name="watchLink"
                                    className="form-input"
                                    placeholder="https://youtube.com/watch?v=..."
                                    value={form.watchLink}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Download Link */}
                            <div className="form-group">
                                <label className="form-label">Download URL</label>
                                <input
                                    type="url"
                                    name="downloadLink"
                                    className="form-input"
                                    placeholder="https://drive.google.com/..."
                                    value={form.downloadLink}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Telegram Link */}
                            <div className="form-group full-width">
                                <label className="form-label">Telegram Link</label>
                                <input
                                    type="url"
                                    name="telegramLink"
                                    className="form-input"
                                    placeholder="https://t.me/yourchannel"
                                    value={form.telegramLink}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Toggles */}
                            <div className="form-group">
                                <label className="form-checkbox">
                                    <input type="checkbox" name="isTrending" checked={form.isTrending} onChange={handleChange} />
                                    🔥 Mark as Trending
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-checkbox">
                                    <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
                                    ⭐ Featured on Homepage
                                </label>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary btn-lg">
                                🚀 Publish Movie
                            </button>
                            <Link href="/admin/dashboard" className="btn btn-outline btn-lg">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </main>
            </div>

            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.type === 'success' ? '✅' : '❌'} {toast.message}
                </div>
            )}
        </>
    );
}
