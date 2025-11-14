import Header from "@/components/header";
import { fetchPopular, fetchTopRated, fetchUpcoming } from "@/libs/tmdb";
import Banner from "@/components/banner";
import MovieRow from "@/components/movierow";

export default async function Home() {
  const popularData = await fetchPopular();
  const topRatedData = await fetchTopRated();
  const upcomingData = await fetchUpcoming();

  const popularMovies = popularData.results;
  const topRatedMovies = topRatedData.results;
  const upcomingMovies = upcomingData.results;

  // Pass first 5 movies to the banner for rotation
  const bannerMovies = popularMovies.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-[#141414]">
      <Header />
      <div className="w-full flex flex-col gap-3">
        <Banner movies={bannerMovies} />
        <div className="w-[90%] mx-auto flex flex-col gap-3 pb-10">
          <MovieRow movies={popularMovies} categoryTitle="Popular on MovieDashboard" />
          <MovieRow movies={topRatedMovies} categoryTitle="Top Rated" />
          <MovieRow movies={upcomingMovies} categoryTitle="Coming Soon" />
        </div>
      </div>
    </div>
  );
}