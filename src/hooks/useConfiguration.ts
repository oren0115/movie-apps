import { useQuery } from '@tanstack/react-query'
import { getConfiguration } from '../api/tmdb'
import { setImageConfig } from '../utils/image'

export function useConfiguration() {
  return useQuery({
    queryKey: ['tmdb', 'configuration'],
    queryFn: async () => {
      const config = await getConfiguration()
      // Set image config globally
      setImageConfig(config.images)
      return config
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - config rarely changes
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  })
}

