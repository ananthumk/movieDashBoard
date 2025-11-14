'use client'

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  

  return (
    <header className='sticky top-0 z-50 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center'>
        {/* Logo */}
        <Link href="/" className='flex items-center gap-3 group'>
          <h1 className='text-2xl md:text-3xl font-bold'>
            <span className='text-red-600'>Movie</span>
            <span className='text-white'>Dashboard</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <div className='relative hidden md:block'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type='search'
            placeholder='Search movies, actors, genres...'
    
            className='w-[350px] py-2.5 pl-12 pr-4 bg-gray-900 text-white text-sm rounded-full border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all placeholder:text-gray-500'
          />
        </div>

        {/* Mobile Search Icon */}
        <button className='md:hidden text-white hover:text-red-600 transition-colors'>
          <Search className='w-6 h-6' />
        </button>
      </div>
    </header>
  );
}