import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface MovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
}

async function getMovieDetails(id: string): Promise<MovieDetails | null> {
    const BASE = 'https://api.themoviedb.org/3';
    const API_KEY = process.env.TMDB_API_KEY;
    if (!API_KEY) {
        throw new Error('TMDB_API_KEY is not set. Add TMDB_API_KEY to .env.local');
    }

    const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        // Log status and body to server console to aid debugging during development
        try {
            const bodyText = await res.text();
            console.error('[TMDB] fetch failed', { status: res.status, body: bodyText });
        } catch (e) {
            console.error('[TMDB] fetch failed; could not read body', e);
        }
        // Return 404 for not found or invalid responses
        return null;
    }

    return res.json();
}

export default async function MoviePage({ params }: { params: any }) {
    const { id } = await params;
    const movie = await getMovieDetails(id);

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
                    <p className="text-gray-400 mb-6">We couldn't find the movie you're looking for.</p>
                    <a
                        href="/"
                        className="inline-block px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414]">
            {/* Backdrop with Gradient Overlay */}
            <div className="relative h-[60vh] md:h-[80vh] w-full">
                {movie.backdrop_path && (
                    <>
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-[#141414]/80 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-transparent to-[#141414]/50" />
                    </>
                )}
            </div>

            {/* Content */}
            <div className="relative -mt-32 md:-mt-48 px-4 md:px-8 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Poster */}
                        {movie.poster_path && (
                            <div className="shrink-0 mx-auto md:mx-0">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    width={300}
                                    height={450}
                                    className="rounded-lg shadow-2xl"
                                />
                            </div>
                        )}

                        {/* Movie Details */}
                        <div className="flex-1 text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-3">
                                {movie.title}
                            </h1>
                            
                            {movie.tagline && (
                                <p className="text-gray-400 italic text-lg mb-6">
                                    "{movie.tagline}"
                                </p>
                            )}

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 text-xl">⭐</span>
                                    <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                                    <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
                                </div>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-300">{movie.release_date}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-300">{movie.runtime} min</span>
                                <span className="text-gray-400">•</span>
                                <span className="px-3 py-1 bg-red-600 rounded text-sm font-semibold">
                                    {movie.status}
                                </span>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            {/* Overview */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                    {movie.overview}
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
                                    <p className="text-white text-lg font-semibold">
                                        ${movie.budget.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm mb-1">Revenue</h3>
                                    <p className="text-white text-lg font-semibold">
                                        ${movie.revenue.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm mb-1">Original Language</h3>
                                    <p className="text-white text-lg font-semibold uppercase">
                                        {movie.original_language}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm mb-1">IMDB</h3>
                                    <a 
                                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-400 hover:text-yellow-300 text-lg font-semibold"
                                    >
                                        {movie.imdb_id}
                                    </a>
                                </div>
                            </div>

                            {/* Production Companies */}
                            {movie.production_companies.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-4">Production Companies</h3>
                                    <div className="flex flex-wrap gap-6">
                                        {movie.production_companies.map((company) => (
                                            <div key={company.id} className="flex items-center gap-3">
                                                {company.logo_path ? (
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                        alt={company.name}
                                                        width={60}
                                                        height={30}
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">{company.name}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                {movie.homepage && (
                                    <a
                                        href={movie.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Official Website
                                    </a>
                                )}
                                <Link
                                    href="/"
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}