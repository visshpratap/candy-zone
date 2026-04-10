import './globals.css';

export const metadata = {
    title: 'CandyZone — Stream & Download Latest Movies',
    description: 'CandyZone is your ultimate destination for the latest movies, trending films, and exclusive content. Stream or download movies in HD quality.',
    keywords: 'movies, streaming, download, latest movies, trending, HD movies, CandyZone',
    openGraph: {
        title: 'CandyZone — Stream & Download Latest Movies',
        description: 'Your ultimate destination for the latest movies and trending films.',
        type: 'website',
        siteName: 'CandyZone',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
