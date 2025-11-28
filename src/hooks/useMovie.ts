import { useQuery } from '@tanstack/react-query'
import { getMovieDetails, getMovieCredits, getMovieVideos, getMovieRecommendations } from '../api/tmdb'

export function useMovie(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 15, // 15 minutes
  })
}

export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 15,
  })
}

export function useMovieVideos(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 15,
  })
}

export function useMovieRecommendations(movieId: number, page: number = 1) {
  return useQuery({
    queryKey: ['movie', movieId, 'recommendations', page],
    queryFn: () => getMovieRecommendations(movieId, page),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

