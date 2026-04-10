'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setMobileMenuOpen(false);
        }
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    <Link href="/" className="navbar-logo">
                        Candy<span>Zone</span>
                    </Link>

                    <div className="navbar-nav">
                        <Link href="/" className="navbar-link">Home</Link>
                        <Link href="/search?sort=views" className="navbar-link">Trending</Link>
                        <Link href="/search" className="navbar-link">Browse</Link>
                    </div>

                    <form className="navbar-search" onSubmit={handleSearch}>
                        <span className="navbar-search-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    <div className="navbar-right">
                        <Link href="/admin" className="navbar-admin-link">
                            ⚡ Admin
                        </Link>
                    </div>

                    <button
                        className="navbar-mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>🏠 Home</Link>
                <Link href="/search?sort=views" onClick={() => setMobileMenuOpen(false)}>🔥 Trending</Link>
                <Link href="/search" onClick={() => setMobileMenuOpen(false)}>🎬 Browse All</Link>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>⚡ Admin Panel</Link>
                <form onSubmit={handleSearch} style={{ marginTop: '8px' }}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input"
                        style={{ width: '100%' }}
                    />
                </form>
            </div>
        </>
    );
}
