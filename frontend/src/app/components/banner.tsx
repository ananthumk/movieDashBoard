'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Movie {
    id: number,
    title: string,
    poster_path?: string | null,
    backdrop_path?: string | null,
    overview: string,
    release_date?: string;
    vote_average?: number;
}

export default function Banner({ movies }: { movies: Movie[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [movies.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const currentMovie = movies[currentIndex];

    return (
        <div className="w-full relative h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden group">
            {/* Background Image */}
            <Image 
                key={currentMovie.id}
                src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
                alt={currentMovie.title}
                fill
                priority
                className="object-cover animate-fadeIn"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-[#141414]/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-transparent to-transparent z-10" />
            
            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronRight className="w-8 h-8" />
            </button>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-20">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                        {currentMovie.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
                        {currentMovie.vote_average && (
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400 text-xl">⭐</span>
                                <span className="text-white font-semibold">
                                    {currentMovie.vote_average.toFixed(1)}
                                </span>
                            </div>
                        )}
                        {currentMovie.release_date && (
                            <>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-300">
                                    {new Date(currentMovie.release_date).getFullYear()}
                                </span>
                            </>
                        )}
                    </div>
                    
                    <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-6 line-clamp-3 md:line-clamp-4 drop-shadow-md">
                        {currentMovie.overview}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                        <Link
                            href={`/movie/${currentMovie.id}`}
                            className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                            </svg>
                            Play
                        </Link>
                        <Link
                            href={`/movie/${currentMovie.id}`}
                            className="px-6 py-3 bg-gray-600/80 text-white font-semibold rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            More Info
                        </Link>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex gap-2">
                        {movies.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1 rounded-full transition-all ${
                                    index === currentIndex 
                                        ? 'bg-white w-8' 
                                        : 'bg-gray-600 w-6'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}