# 🍬 CandyZone — Movie Streaming & Listing Website

A Netflix-style movie website built with **Next.js 14** where admins can upload movies with posters and external streaming/download links.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![React](https://img.shields.io/badge/React-18-blue?logo=react)

## ✨ Features

- **🎬 Homepage** — Hero banner, trending movies, genre filters, latest movies grid
- **🎥 Movie Details** — Full poster, synopsis, metadata, Watch/Download/Telegram buttons
- **🔍 Search & Filter** — Search by title/director/cast, filter by genre/year, sort options
- **⚡ Admin Panel** — Dashboard with stats, add/edit/delete movies, image upload
- **📱 Responsive** — Mobile-first design, works on all screen sizes
- **🌙 Dark Theme** — Netflix-style cinematic dark theme with candy-colored accents
- **🎯 SEO** — Dynamic meta tags, Open Graph support

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:3000
```

## 📁 Project Structure

```
candyzone/
├── app/
│   ├── globals.css          # Design system & styles
│   ├── layout.js            # Root layout
│   ├── page.js              # Homepage
│   ├── movie/[id]/page.js   # Movie detail page
│   ├── search/page.js       # Search & filter page
│   └── admin/
│       ├── page.js           # Admin login
│       └── dashboard/
│           ├── page.js       # Admin dashboard
│           ├── add/page.js   # Add movie form
│           └── edit/[id]/page.js # Edit movie form
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── MovieCard.js
│   ├── HeroBanner.js
│   └── GenreFilter.js
├── lib/
│   ├── movies.js            # Data access layer
│   └── seed-data.js         # Sample movie data
└── public/posters/          # Movie poster images
```

## 🎨 Admin Panel

1. Go to `/admin`
2. Enter any email/password (demo mode)
3. Add, edit, or delete movies from the dashboard
4. Upload poster images and paste external links (YouTube, Telegram, Drive, etc.)

## 🔧 Firebase Setup (Optional for Production)

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Copy `.env.local.example` to `.env.local`
3. Add your Firebase config values
4. Enable Firestore, Storage, and Authentication

## 🌐 Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npx vercel
```

## 📄 License

MIT © CandyZone
