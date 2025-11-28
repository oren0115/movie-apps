import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '../api/tmdb'

interface WatchlistState {
  movies: Movie[]
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
  clearWatchlist: () => void
}

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      movies: [],
      addToWatchlist: (movie) =>
        set((state) => {
          if (state.movies.some((m) => m.id === movie.id)) {
            return state
          }
          return { movies: [...state.movies, movie] }
        }),
      removeFromWatchlist: (movieId) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.id !== movieId),
        })),
      isInWatchlist: (movieId) =>
        get().movies.some((m) => m.id === movieId),
      clearWatchlist: () => set({ movies: [] }),
    }),
    {
      name: 'watchlist-storage',
    }
  )
)

