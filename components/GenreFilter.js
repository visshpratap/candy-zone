'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function GenreFilter({ genres }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeGenre = searchParams.get('genre') || 'All';

    const handleGenreClick = (genre) => {
        if (genre === 'All') {
            router.push('/search');
        } else {
            router.push(`/search?genre=${encodeURIComponent(genre)}`);
        }
    };

    return (
        <div className="genre-filter">
            {genres.map((genre) => (
                <button
                    key={genre}
                    className={`genre-chip ${activeGenre === genre ? 'active' : ''}`}
                    onClick={() => handleGenreClick(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
}
