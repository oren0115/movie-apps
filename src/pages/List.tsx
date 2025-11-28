import { useWatchlist } from '../store/watchlist'
import { MovieCard } from '../components/MovieCard'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Trash2 } from 'lucide-react'

export function List() {
  const { movies, removeFromWatchlist, clearWatchlist } = useWatchlist()

  if (movies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">My Watchlist</h1>
          <p className="text-muted-foreground text-lg">
            Your watchlist is empty
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Add movies to your watchlist to see them here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <Button variant="outline" onClick={clearWatchlist}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      <p className="text-muted-foreground mb-6">
        {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in your watchlist
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <MovieCard movie={movie} size="md" />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={() => removeFromWatchlist(movie.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

