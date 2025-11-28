import type { MovieDetail as MovieDetailType, CastMember, Video, Movie } from '../api/tmdb'
import { buildImageUrl, getBackdropSize } from '../utils/image'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Star, Plus, Check, Play, Calendar, Clock } from 'lucide-react'
import { useWatchlist } from '../store/watchlist'
import { RecommendationsPanel } from './RecommendationsPanel'

interface MovieDetailProps {
  movie: MovieDetailType
  credits?: {
    cast: CastMember[]
  }
  videos?: {
    results: Video[]
  }
  recommendations?: Movie[]
  isLoadingRecommendations?: boolean
}

export function MovieDetail({
  movie,
  credits,
  videos,
  recommendations,
  isLoadingRecommendations,
}: MovieDetailProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const inWatchlist = isInWatchlist(movie.id)

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  const trailer = videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
  ) || videos?.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube')

  const backdropUrl = buildImageUrl(
    movie.backdrop_path,
    getBackdropSize(window.innerWidth),
    'backdrop'
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] min-h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {movie.vote_average && movie.vote_average > 0 && (
                <div className="flex items-center gap-1 bg-black/70 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
              {movie.release_date && (
                <div className="flex items-center gap-1 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(movie.release_date).getFullYear()}
                </div>
              )}
              {movie.runtime && (
                <div className="flex items-center gap-1 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
                  <Clock className="w-4 h-4" />
                  {movie.runtime} min
                </div>
              )}
            </div>
            <div className="flex gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              {trailer && (
                <Button
                  onClick={() => {
                    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')
                  }}
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Trailer
                </Button>
              )}
              <Button
                variant={inWatchlist ? 'secondary' : 'outline'}
                size="lg"
                onClick={handleWatchlistToggle}
              >
                {inWatchlist ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Watchlist
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            {movie.overview && (
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
                </CardContent>
              </Card>
            )}

            {/* Cast */}
            {credits && credits.cast.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {credits.cast.slice(0, 9).map((actor) => (
                      <div key={actor.id} className="flex items-center gap-3">
                        <img
                          src={buildImageUrl(actor.profile_path, 'w185', 'profile')}
                          alt={actor.name}
                          className="w-12 h-12 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-medium text-sm">{actor.name}</p>
                          <p className="text-xs text-muted-foreground">{actor.character}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 && (
              <RecommendationsPanel
                movies={recommendations}
                isLoading={isLoadingRecommendations}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {movie.tagline && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg italic text-center text-muted-foreground">
                    "{movie.tagline}"
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {movie.status && (
                  <div>
                    <span className="font-medium">Status: </span>
                    <span className="text-muted-foreground">{movie.status}</span>
                  </div>
                )}
                {movie.original_language && (
                  <div>
                    <span className="font-medium">Original Language: </span>
                    <span className="text-muted-foreground uppercase">
                      {movie.original_language}
                    </span>
                  </div>
                )}
                {movie.budget && movie.budget > 0 && (
                  <div>
                    <span className="font-medium">Budget: </span>
                    <span className="text-muted-foreground">
                      ${movie.budget.toLocaleString()}
                    </span>
                  </div>
                )}
                {movie.revenue && movie.revenue > 0 && (
                  <div>
                    <span className="font-medium">Revenue: </span>
                    <span className="text-muted-foreground">
                      ${movie.revenue.toLocaleString()}
                    </span>
                  </div>
                )}
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <span className="font-medium">Production: </span>
                    <div className="mt-1">
                      {movie.production_companies.map((company) => (
                        <Badge key={company.id} variant="outline" className="mr-1 mb-1">
                          {company.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

