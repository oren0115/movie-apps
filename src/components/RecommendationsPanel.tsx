import type { Movie } from '../api/tmdb'
import { MovieCarousel } from './MovieCarousel'
import { Skeleton } from './ui/skeleton'

interface RecommendationsPanelProps {
  movies: Movie[]
  isLoading?: boolean
}

export function RecommendationsPanel({ movies, isLoading }: RecommendationsPanelProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-48 h-72" />
          ))}
        </div>
      </div>
    )
  }

  if (movies.length === 0) {
    return null
  }

  return <MovieCarousel movies={movies} title="Recommendations" />
}

