const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchAPI(endpoint, options = {}) {
  const isServer = typeof window === 'undefined';
  const token = !isServer ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_URL}/api${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}: ${res.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
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
    getAll: () => fetchAPI('/lessons'),
    getBySlug: (slug) => fetchAPI(`/lessons/${slug}`),
  },
  auth: {
    login: (credentials) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (data) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    getMe: () => fetchAPI('/auth/me'),
  }
};
