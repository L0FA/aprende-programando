const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function getHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: { ...getHeaders(), 'Content-Type': 'application/json', ...options.headers },
  });
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
  },
  auth: {
    login: async (credentials) => {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    },
    register: async (data) => {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Register failed');
      const result = await res.json();
      if (result.token) localStorage.setItem('token', result.token);
      return result;
    },
    me: () => fetchAPI('/auth/me'),
  },
  progress: {
    getCourseProgress: (courseId) => fetchAPI(`/progress/progress/${courseId}`),
    completeLesson: (lessonId) => fetch(`${API_URL}/api/progress/lesson/${lessonId}/complete`, {
      method: 'POST',
    }).then(res => res.json()),
    getStats: () => fetchAPI('/progress/stats'),
  },
  admin: {
    getStats: () => fetchAPI('/admin/stats'),
    getUsers: () => fetchAPI('/admin/users'),
    getCourses: () => fetchAPI('/admin/courses'),
    getCategories: () => fetchAPI('/admin/categories'),
  },
};