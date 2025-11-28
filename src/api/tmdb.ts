// TMDb API client
// Uses API v3 with api_key query parameter
// For production, consider using a backend proxy to hide the API key

const API_BASE = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  genre_ids?: number[]
  vote_average?: number
  vote_count?: number
  popularity?: number
  adult?: boolean
  original_language?: string
  original_title?: string
}

export interface MovieDetail extends Movie {
  genres: Array<{ id: number; name: string }>
  runtime?: number
  budget?: number
  revenue?: number
  status?: string
  tagline?: string
  production_companies?: Array<{ id: number; name: string; logo_path: string | null }>
  production_countries?: Array<{ iso_3166_1: string; name: string }>
  spoken_languages?: Array<{ iso_639_1: string; name: string }>
  homepage?: string
  imdb_id?: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface VideosResponse {
  results: Video[]
}

export interface Genre {
  id: number
  name: string
}

export interface GenresResponse {
  genres: Genre[]
}

export interface ImageConfig {
  images: {
    base_url: string
    secure_base_url: string
    backdrop_sizes: string[]
    logo_sizes: string[]
    poster_sizes: string[]
    profile_sizes: string[]
    still_sizes: string[]
  }
  change_keys: string[]
}

export interface DiscoverParams {
  page?: number
  sort_by?: string
  with_genres?: string
  primary_release_year?: number
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  with_original_language?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  page: number
  total_pages: number
  total_results: number
}

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<T> {
  const url = new URL(`${API_BASE}${path}`)
  
  // Add API key
  if (API_KEY) {
    url.searchParams.set('api_key', API_KEY)
  }
  
  // Add other parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  const res = await fetch(url.toString())
  
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`TMDb API Error ${res.status}: ${errorText}`)
  }

  return res.json() as Promise<T>
}

// Configuration
export const getConfiguration = () =>
  tmdbFetch<ImageConfig>('/configuration')

// Discover movies
export const discoverMovies = (params: DiscoverParams = {}) =>
  tmdbFetch<PaginatedResponse<Movie>>('/discover/movie', {
    page: params.page || 1,
    sort_by: params.sort_by || 'popularity.desc',
    with_genres: params.with_genres,
    primary_release_year: params.primary_release_year,
    'vote_average.gte': params['vote_average.gte'],
    'vote_average.lte': params['vote_average.lte'],
    with_original_language: params.with_original_language,
  })

// Search movies
export const searchMovies = (query: string, page: number = 1) =>
  tmdbFetch<PaginatedResponse<Movie>>('/search/movie', {
    query,
    page,
  })

// Get movie details
export const getMovieDetails = (movieId: number) =>
  tmdbFetch<MovieDetail>(`/movie/${movieId}`)

// Get movie recommendations
export const getMovieRecommendations = (movieId: number, page: number = 1) =>
  tmdbFetch<PaginatedResponse<Movie>>(`/movie/${movieId}/recommendations`, {
    page,
  })

// Get popular movies
export const getPopularMovies = (page: number = 1) =>
  tmdbFetch<PaginatedResponse<Movie>>('/movie/popular', { page })

// Get top rated movies
export const getTopRatedMovies = (page: number = 1) =>
  tmdbFetch<PaginatedResponse<Movie>>('/movie/top_rated', { page })

// Get movie credits
export const getMovieCredits = (movieId: number) =>
  tmdbFetch<Credits>(`/movie/${movieId}/credits`)

// Get movie videos (trailers)
export const getMovieVideos = (movieId: number) =>
  tmdbFetch<VideosResponse>(`/movie/${movieId}/videos`)

// Get genres
export const getGenres = () =>
  tmdbFetch<GenresResponse>('/genre/movie/list')

