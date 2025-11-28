import { useState } from 'react'
import { useDiscover } from '../hooks/useDiscover'
import { FiltersPanel } from '../components/FiltersPanel'
import { MovieCard } from '../components/MovieCard'
import { Skeleton } from '../components/ui/skeleton'

export function Discover() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [year, setYear] = useState<number | undefined>()
  const [minRating, setMinRating] = useState<number | undefined>()
  const [sortBy, setSortBy] = useState<string>('popularity.desc')

  const { data, isLoading } = useDiscover({
    with_genres: selectedGenres.length > 0 ? selectedGenres.join(',') : undefined,
    primary_release_year: year,
    'vote_average.gte': minRating,
    sort_by: sortBy,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FiltersPanel
            selectedGenres={selectedGenres}
            onGenresChange={setSelectedGenres}
            year={year}
            onYearChange={setYear}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Discover Movies</h1>
            {data && (
              <p className="text-muted-foreground">
                Found {data.total_results.toLocaleString()} movies
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="w-full h-96" />
              ))}
            </div>
          ) : data && data.results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} size="md" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No movies found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

