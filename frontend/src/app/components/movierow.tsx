"use client"

import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from "next/link";

interface Movies {
    id: number,
    title: string;
    overview: string,
    backdrop_path: string | null,
    poster_path: string | null,
    release_date: string,
    vote_average: number,
    vote_count: number
}

export default function MovieRow({ movies, categoryTitle }: {
    movies: Movies[];
    categoryTitle: string;
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 3
    })
    
    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold mb-5 text-white">{categoryTitle}</h2>
            <div className="relative group">
                <button 
                    onClick={() => emblaApi?.scrollPrev()} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronLeft className='h-6 w-6' />
                </button>
                
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4">
                        {movies?.map((eachMovie) => (
                            <Link 
                                href={`/movie/${eachMovie.id}`} 
                                key={eachMovie.id} 
                                className="flex-[0_0_280px] cursor-pointer hover:scale-105 transition-transform duration-300"
                            >
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${eachMovie.backdrop_path}`}
                                    alt={eachMovie.title}
                                    width={280}
                                    height={158}
                                    className="rounded-md object-cover"
                                />
                                {/* <div className="mt-2">
                                    <h3 className="text-white font-semibold line-clamp-1 text-sm">
                                        {eachMovie.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-yellow-400 text-xs">
                                            ⭐ {eachMovie.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                            {eachMovie.release_date}
                                        </span>
                                    </div>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>
                
                <button
                    onClick={() => emblaApi?.scrollNext()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}