const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchAPI(endpoint) {
  const res = await fetch(`${API_URL}/api${endpoint}`);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

export const api = {
  categories: {
    getAll: () => fetchAPI('/categories'),
    getBySlug: (slug) => fetchAPI(`/categories/${slug}`),
  },
  courses: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchAPI(`/courses${query ? `?${query}` : ''}`);
    },
    getBySlug: (slug) => fetchAPI(`/courses/${slug}`),
  },
  lessons: {
    getBySlug: (slug) => fetchAPI(`/lessons/${slug}`),
  }
};
