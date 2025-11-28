import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { discoverMovies, getPopularMovies, getTopRatedMovies } from '../api/tmdb'
import type { DiscoverParams } from '../api/tmdb'

export function useDiscover(params: DiscoverParams = {}) {
  return useQuery({
    queryKey: ['discover', params],
    queryFn: () => discoverMovies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useDiscoverInfinite(params: Omit<DiscoverParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: ['discover', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => discoverMovies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function usePopularMovies() {
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => getPopularMovies(1),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: () => getTopRatedMovies(1),
    staleTime: 1000 * 60 * 10,
  })
}

