const imageMap = {
  code: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  brain: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  terminal: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
  globe: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
  book: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=400&fit=crop',
  rocket: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
  default: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'
};

const courseImages = {
  'vscode-desde-cero': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  'cursor-ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  'intro-ia': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  'crear-chatbot': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
  'python-principiantes': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
  'javascript-moderno': 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
};

const categoryImages = {
  'editores-codigo': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop',
  'inteligencia-artificial': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop',
  'fundamentos': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=300&fit=crop',
  'lenguajes': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=300&fit=crop',
  'desarrollo-web': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=300&fit=crop',
  'proyectos': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop',
};

export function getCourseImage(courseSlug, categoryIcon) {
  if (courseImages[courseSlug]) return courseImages[courseSlug];
  return getCategoryImage(categoryIcon);
}

export function getCategoryImage(icon) {
  return imageMap[icon] || imageMap.default;
}

export const courseEmojis = {
  code: '💻',
  brain: '🧠',
  terminal: '⌨️',
  globe: '🌐',
  book: '📚',
  rocket: '🚀',
  default: '🎓'
};
