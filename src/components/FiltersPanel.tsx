
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useGenres } from '../hooks/useGenres'
import { X } from 'lucide-react'

interface FiltersPanelProps {
  selectedGenres: number[]
  onGenresChange: (genres: number[]) => void
  year?: number
  onYearChange: (year?: number) => void
  minRating?: number
  onMinRatingChange: (rating?: number) => void
  sortBy?: string
  onSortByChange: (sortBy: string) => void
}

export function FiltersPanel({
  selectedGenres,
  onGenresChange,
  year,
  onYearChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortByChange,
}: FiltersPanelProps) {
  const { data: genresData, isLoading } = useGenres()
  const genres = genresData?.genres || []

  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      onGenresChange(selectedGenres.filter((id) => id !== genreId))
    } else {
      onGenresChange([...selectedGenres, genreId])
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularity' },
    { value: 'release_date.desc', label: 'Newest' },
    { value: 'release_date.asc', label: 'Oldest' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'revenue.desc', label: 'Revenue' },
  ]

  const clearFilters = () => {
    onGenresChange([])
    onYearChange(undefined)
    onMinRatingChange(undefined)
    onSortByChange('popularity.desc')
  }

  const hasActiveFilters = selectedGenres.length > 0 || year || minRating || sortBy !== 'popularity.desc'

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-medium mb-2 block">Sort By</label>
        <select
          value={sortBy || 'popularity.desc'}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full p-2 border rounded-md bg-background"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Genres */}
      <div>
        <label className="text-sm font-medium mb-2 block">Genres</label>
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading genres...</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre.id}
                variant={selectedGenres.includes(genre.id) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleGenre(genre.id)}
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Year */}
      <div>
        <label className="text-sm font-medium mb-2 block">Release Year</label>
        <select
          value={year || ''}
          onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full p-2 border rounded-md bg-background"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Minimum Rating: {minRating ? minRating.toFixed(1) : 'Any'}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={minRating || 0}
          onChange={(e) => onMinRatingChange(e.target.value ? parseFloat(e.target.value) : undefined)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0</span>
          <span>10</span>
        </div>
      </div>
    </div>
  )
}

