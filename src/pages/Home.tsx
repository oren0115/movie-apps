import { useConfiguration } from '../hooks/useConfiguration'
import { usePopularMovies, useTopRatedMovies, useDiscover } from '../hooks/useDiscover'
import { MovieCarousel } from '../components/MovieCarousel'
import { Skeleton } from '../components/ui/skeleton'
import { useWatchlist } from '../store/watchlist'
import { buildImageUrl, getBackdropSize } from '../utils/image'

export function Home() {
  const { isLoading: configLoading } = useConfiguration()
  const { data: popularData, isLoading: popularLoading } = usePopularMovies()
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedMovies()
  const { movies: watchlistMovies } = useWatchlist()

  // Get "For You" recommendations based on watchlist
  const watchedGenres = new Set<number>()
  watchlistMovies.forEach((movie) => {
    movie.genre_ids?.forEach((id) => watchedGenres.add(id))
  })
  const genreIds = Array.from(watchedGenres).slice(0, 3).join(',')

  const { data: forYouData, isLoading: forYouLoading } = useDiscover({
    with_genres: genreIds || undefined,
    sort_by: 'popularity.desc',
  })

  if (configLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-96 w-full" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-4">
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} className="w-48 h-72" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      {popularData && popularData.results.length > 0 && (
        <div className="relative h-[60vh] min-h-[400px] rounded-lg overflow-hidden">
          <img
            src={buildImageUrl(popularData.results[0].backdrop_path, getBackdropSize(window.innerWidth), 'backdrop')}
            alt={popularData.results[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {popularData.results[0].title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl line-clamp-2">
              {popularData.results[0].overview}
            </p>
          </div>
        </div>
      )}

      {/* For You Section */}
      {watchlistMovies.length > 0 && forYouData && forYouData.results.length > 0 && (
        <MovieCarousel
          movies={forYouData.results}
          title="For You"
          isLoading={forYouLoading}
        />
      )}

      {/* Popular Movies */}
      <MovieCarousel
        movies={popularData?.results || []}
        title="Popular Now"
        isLoading={popularLoading}
      />

      {/* Top Rated */}
      <MovieCarousel
        movies={topRatedData?.results || []}
        title="Top Rated"
        isLoading={topRatedLoading}
      />
    </div>
  )
}

