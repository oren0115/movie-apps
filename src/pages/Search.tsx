import { useSearchParams } from 'react-router-dom'
import { useSearchMovies } from '../hooks/useSearch'
import { MovieCard } from '../components/MovieCard'
import { Skeleton } from '../components/ui/skeleton'
import { Input } from '../components/ui/input'
import { Search as SearchIcon } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { data, isLoading } = useSearchMovies(query, query.length > 0)
  const [searchInput, setSearchInput] = useState(query)
  const navigate = useNavigate()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </form>
      </div>

      {query && (
        <>
          <h1 className="text-2xl font-bold mb-6">
            Search Results for "{query}"
          </h1>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="w-full h-96" />
              ))}
            </div>
          ) : data && data.results.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Found {data.total_results.toLocaleString()} results
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} size="md" />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No results found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try a different search term
              </p>
            </div>
          )}
        </>
      )}

      {!query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Enter a search term to find movies
          </p>
        </div>
      )}
    </div>
  )
}

