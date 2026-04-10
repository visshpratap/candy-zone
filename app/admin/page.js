'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Hardcoded credentials for admin access
        const ADMIN_EMAIL = 'admin@candyzone.com';
        const ADMIN_PASSWORD = 'password123';

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Simulate auth delay
            await new Promise((r) => setTimeout(r, 800));

            // Store simple auth token in localStorage
            localStorage.setItem('candyzone_admin', JSON.stringify({
                email,
                loggedIn: true,
                timestamp: Date.now()
            }));

            router.push('/admin/dashboard');
        } else {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-card animate-fade-in">
                <div className="login-logo">🍬 CandyZone</div>
                <p className="login-subtitle">Admin Panel — Sign in to manage movies</p>

                {error && (
                    <div className="toast toast-error" style={{ position: 'relative', marginBottom: '16px', animation: 'none', bottom: 'auto', right: 'auto' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="admin@candyzone.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: '8px' }}
                        disabled={loading}
                    >
                        {loading ? '⏳ Signing in...' : '🔓 Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        ← Back to CandyZone
                    </Link>
                </div>

                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>💡 Admin Access:</strong><br />
                    Email: <strong>admin@candyzone.com</strong><br />
                    Password: <strong>password123</strong>
                </div>
            </div>
        </div>
    );
}
