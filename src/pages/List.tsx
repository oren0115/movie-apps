import { useWatchlist } from '../store/watchlist'
import { MovieCard } from '../components/MovieCard'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Trash2 } from 'lucide-react'

export function List() {
  const { movies, removeFromWatchlist, clearWatchlist } = useWatchlist()

  if (movies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">My Watchlist</CardTitle>
            <CardDescription className="text-lg">
              Your watchlist is empty
            </CardDescription>
            <CardDescription className="text-sm mt-2">
              Add movies to your watchlist to see them here
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Watchlist</CardTitle>
              <CardDescription className="mt-1">
                {movies.length} {movies.length === 1 ? 'movie' : 'movies'} in your watchlist
              </CardDescription>
            </div>
            <Button variant="outline" onClick={clearWatchlist}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardHeader>
      </Card>

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

