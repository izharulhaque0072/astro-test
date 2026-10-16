const API = (import.meta.env.WORDPRESS_API_URL || 'https://dignitas.digital/wp-json/wp/v2').replace(/\/$/, '');

export async function wpFetch(path, options = {}) {
  const url = `${API}/${path.replace(/^\//, '')}`;
  const response = await fetch(url, { ...options, headers: { Accept: 'application/json', ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`WordPress API returned ${response.status} for ${path}`);
  return response.json();
}

export function plainText(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;/g, '’').replace(/&#8216;/g, '‘').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/\s+/g, ' ').trim();
}

export function getFeaturedImage(post) {
  return post?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url
    || post?._embedded?.['wp:featuredmedia']?.[0]?.source_url
    || '';
}
