const BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export async function fetchPopular() {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
}

export async function fetchTopRated() {
  const res = await fetch(`${BASE}/movie/top_rated?api_key=${API_KEY}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch top rated movies');
  return res.json();
}

export async function fetchUpcoming() {
  const res = await fetch(`${BASE}/movie/upcoming?api_key=${API_KEY}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch upcoming movies');
  return res.json();
}
