/**
 * Utility functions for host management
 */

/**
 * Get the host value from localStorage
 * @returns The host value or null if not set
 */
export const getHost = (): string | null => {
  try {
    return localStorage.getItem('host')
  } catch (error) {
    console.error('Error reading host from localStorage:', error)
    return null
  }
}

/**
 * Set the host value in localStorage
 * @param host - The host value to save
 */
export const setHost = (host: string): void => {
  try {
    localStorage.setItem('host', host.trim())
  } catch (error) {
    console.error('Error saving host to localStorage:', error)
  }
}

/**
 * Remove the host value from localStorage
 */
export const clearHost = (): void => {
  try {
    localStorage.removeItem('host')
  } catch (error) {
    console.error('Error clearing host from localStorage:', error)
  }
}

/**
 * Get the host value with a fallback
 * @param fallback - Default value if host is not set
 * @returns The host value or the fallback
 */
export const getHostWithFallback = (fallback: string = 'localhost'): string => {
  return getHost() || fallback
}
