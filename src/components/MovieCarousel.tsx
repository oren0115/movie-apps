import { useRef } from 'react'
import type { Movie } from '../api/tmdb'
import { MovieCard } from './MovieCard'
import { Skeleton } from './ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

interface MovieCarouselProps {
  movies: Movie[]
  title?: string
  isLoading?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function MovieCarousel({ movies, title, isLoading, size = 'md' }: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 400
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
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

  return (
    <div className="space-y-4 relative group">
      {title && <h2 className="text-2xl font-bold px-4">{title}</h2>}
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieCard movie={movie} size={size} />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

