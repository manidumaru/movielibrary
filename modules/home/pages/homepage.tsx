import MovieListSection from "../components/movieList";
import TrendindSection from "../components/trending";

export default function HomePage() {

  return (
    <div className="mb-6">
      <TrendindSection />
      <MovieListSection />
    </div>
  );
}
