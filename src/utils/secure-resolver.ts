/**
 * @param {string} url
 */
export default function resolve(url: string) {
  let link = url
  // if we're on a secure location, and zetta can't resolve, do the dirty work
  if (window.location.protocol === 'https:' && url.startsWith('ws:')) {
    link = url.replace('ws:', 'wss:')
  }

  if (window.location.protocol === 'https:' && url.startsWith('http:')) {
    link = url.replace('http:', 'https:')
  }

  return link
}
