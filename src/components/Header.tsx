import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useWatchlist } from '../store/watchlist'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { movies } = useWatchlist()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">🎬 FilmApp</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        <nav className="flex items-center gap-4">
          <Link to="/discover">
            <Button variant="ghost">Discover</Button>
          </Link>
          <Link to="/list">
            <Button variant="ghost">
              My List
              {movies.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {movies.length}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

