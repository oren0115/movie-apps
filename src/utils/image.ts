// Image utility for building TMDb image URLs
// Configuration should be fetched from /configuration endpoint

export interface ImageConfig {
  base_url: string
  secure_base_url: string
  backdrop_sizes: string[]
  logo_sizes: string[]
  poster_sizes: string[]
  profile_sizes: string[]
  still_sizes: string[]
}

let imageConfig: ImageConfig | null = null

export function setImageConfig(config: ImageConfig) {
  imageConfig = config
}

export function getImageConfig(): ImageConfig | null {
  return imageConfig
}

/**
 * Build TMDb image URL
 * @param path - Image path from TMDb API (e.g., "/abc123.jpg")
 * @param size - Size identifier (e.g., "w500", "original")
 * @param type - Image type: "poster", "backdrop", "logo", "profile", "still"
 */
export function buildImageUrl(
  path: string | null | undefined,
  size: string = "w500",
  _type: "poster" | "backdrop" | "logo" | "profile" | "still" = "poster"
): string {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image"
  }

  if (!imageConfig) {
    // Fallback to default TMDb URL structure
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  const baseUrl = imageConfig.secure_base_url || imageConfig.base_url
  return `${baseUrl}${size}${path}`
}

/**
 * Get optimal poster size based on container width
 */
export function getPosterSize(width: number): string {
  if (width <= 92) return "w92"
  if (width <= 154) return "w154"
  if (width <= 185) return "w185"
  if (width <= 342) return "w342"
  if (width <= 500) return "w500"
  if (width <= 780) return "w780"
  return "original"
}

/**
 * Get optimal backdrop size based on container width
 */
export function getBackdropSize(width: number): string {
  if (width <= 300) return "w300"
  if (width <= 780) return "w780"
  if (width <= 1280) return "w1280"
  return "original"
}

