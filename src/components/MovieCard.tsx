import { Link } from 'react-router-dom'
import type { Movie } from '../api/tmdb'
import { buildImageUrl } from '../utils/image'
import { Card, CardContent } from './ui/card'
import { Star, Plus, Check } from 'lucide-react'
import { useWatchlist } from '../store/watchlist'
import { cn } from '../lib/utils'

interface MovieCardProps {
  movie: Movie
  size?: 'sm' | 'md' | 'lg'
}

export function MovieCard({ movie, size = 'md' }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const inWatchlist = isInWatchlist(movie.id)

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  const sizeClasses = {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64',
  }

  const posterSize = size === 'sm' ? 'w185' : size === 'lg' ? 'w500' : 'w342'

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <Card className={cn("overflow-hidden transition-all hover:scale-105 hover:shadow-lg", sizeClasses[size])}>
        <div className="relative">
          <img
            src={buildImageUrl(movie.poster_path, posterSize, 'poster')}
            alt={movie.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
          <button
            onClick={handleWatchlistToggle}
            className={cn(
              "absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100",
              inWatchlist && "bg-primary/80 hover:bg-primary"
            )}
            aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {inWatchlist ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-white" />
            )}
          </button>
          {movie.vote_average && movie.vote_average > 0 && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-white">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          {movie.release_date && (
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(movie.release_date).getFullYear()}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

