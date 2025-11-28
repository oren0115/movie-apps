import { useParams } from 'react-router-dom'
import { useMovie, useMovieCredits, useMovieVideos, useMovieRecommendations } from '../hooks/useMovie'
import { MovieDetail } from '../components/MovieDetail'
import { Skeleton } from '../components/ui/skeleton'
import { Card, CardContent } from '../components/ui/card'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const movieId = id ? parseInt(id, 10) : 0

  const { data: movie, isLoading: movieLoading } = useMovie(movieId)
  const { data: credits } = useMovieCredits(movieId)
  const { data: videos } = useMovieVideos(movieId)
  const { data: recommendations, isLoading: recommendationsLoading } = useMovieRecommendations(movieId)

  if (movieLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-[60vh] w-full" />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Movie not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <MovieDetail
      movie={movie}
      credits={credits}
      videos={videos}
      recommendations={recommendations?.results}
      isLoadingRecommendations={recommendationsLoading}
    />
  )
}

