'use client';
import { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save } from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    description: '',
    difficulty: 'BEGINNER',
    duration: '',
    categoryId: '',
    published: false,
    order: 0,
    lessons: []
  });
  const [lessonForm, setLessonForm] = useState({ title: '', slug: '', content: '' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) checkAuth(token);
    else setIsLoading(false);
  }, []);

  const checkAuth = async (token) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        if (user.role === 'ADMIN') {
          setIsLoggedIn(true);
          loadData(token);
        }
      }
    } catch { localStorage.removeItem('adminToken'); }
    setIsLoading(false);
  };

  const loadData = async (token) => {
    const headers = { Authorization: `Bearer ${token}` };
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    const [statsRes, usersRes, coursesRes, catsRes] = await Promise.all([
      fetch(`${API_URL}/api/admin/stats`, { headers }),
      fetch(`${API_URL}/api/admin/users`, { headers }),
      fetch(`${API_URL}/api/admin/courses`, { headers }),
      fetch(`${API_URL}/api/admin/categories`, { headers })
    ]);

    if (statsRes.ok) setStats(await statsRes.json());
    if (usersRes.ok) setUsers(await usersRes.json());
    if (coursesRes.ok) setCourses(await coursesRes.json());
    if (catsRes.ok) setCategories(await catsRes.json());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) { setError(data.error || 'Error en login'); return; }
      if (data.user.role !== 'ADMIN') { setError('No tienes permisos de administrador'); return; }
      
      localStorage.setItem('adminToken', data.token);
      setIsLoggedIn(true);
      loadData(data.token);
    } catch { setError('Error de conexión'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setStats(null);
    setUsers([]);
    setCourses([]);
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const headers = token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : {};
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const updateRole = async (userId, newRole) => {
    await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ role: newRole })
    });
    loadData(token);
  };

  const togglePublish = async (courseId, currentPublished) => {
    await fetch(`${API_URL}/api/admin/courses/${courseId}/publish`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ published: !currentPublished })
    });
    loadData(token);
  };

  const deleteCourse = async (courseId) => {
    if (!confirm('¿Estás seguro de eliminar este curso?')) return;
    await fetch(`${API_URL}/api/admin/courses/${courseId}`, { method: 'DELETE', headers });
    loadData(token);
  };

  const openNewCourse = () => {
    setEditingCourse(null);
    setCourseForm({ title: '', slug: '', description: '', difficulty: 'BEGINNER', duration: '', categoryId: categories[0]?.id || '', published: false, order: 0, lessons: [] });
    setShowCourseModal(true);
  };

  const openEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      slug: course.slug,
      description: course.description || '',
      difficulty: course.difficulty,
      duration: course.duration || '',
      categoryId: course.categoryId,
      published: course.published,
      order: course.order,
      lessons: course.lessons?.map(l => ({ title: l.title, slug: l.slug, content: l.content || '', published: l.published })) || []
    });
    setShowCourseModal(true);
  };

  const handleSaveCourse = async () => {
    if (!courseForm.title || !courseForm.slug || !courseForm.categoryId) {
      alert('Título, slug y categoría son requeridos');
      return;
    }

    const payload = {
      title: courseForm.title,
      slug: courseForm.slug,
      description: courseForm.description,
      difficulty: courseForm.difficulty,
      duration: courseForm.duration,
      categoryId: courseForm.categoryId,
      published: courseForm.published,
      order: courseForm.order,
      lessons: courseForm.lessons
    };

    if (editingCourse) {
      await fetch(`${API_URL}/api/admin/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
    } else {
      await fetch(`${API_URL}/api/admin/courses`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
    }

    setShowCourseModal(false);
    loadData(token);
  };

  const addLesson = () => {
    if (!lessonForm.title || !lessonForm.slug) return;
    const slug = courseForm.lessons.length + 1;
    setCourseForm({
      ...courseForm,
      lessons: [...courseForm.lessons, { ...lessonForm, order: slug }]
    });
    setLessonForm({ title: '', slug: '', content: '' });
  };

  const removeLesson = (index) => {
    setCourseForm({
      ...courseForm,
      lessons: courseForm.lessons.filter((_, i) => i !== index)
    });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Cargando...</div></div>;

  if (!isLoggedIn) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-200 p-4">
      <div className="bg-white dark:bg-dark-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">🔐 Panel de Admin</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white" required />
          </div>
          {error && <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm">{error}</div>}
          <button type="submit" className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel de Administrador</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Cerrar Sesión</button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-gray-800"><div className="text-3xl font-bold text-primary-500">{stats.totalUsers}</div><div className="text-gray-600 dark:text-gray-400">Usuarios</div></div>
            <div className="bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-gray-800"><div className="text-3xl font-bold text-purple-500">{stats.totalCourses}</div><div className="text-gray-600 dark:text-gray-400">Cursos</div></div>
            <div className="bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-gray-800"><div className="text-3xl font-bold text-green-500">{stats.totalLessons}</div><div className="text-gray-600 dark:text-gray-400">Lecciones</div></div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Usuarios ({users.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-200 rounded-lg">
                  <div><div className="font-medium text-gray-900 dark:text-white">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></div>
                  <select value={user.role} onChange={(e) => updateRole(user.id, e.target.value)} className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-100 text-sm">
                    <option value="USER">USER</option><option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              ))}
              {users.length === 0 && <p className="text-gray-500 text-center py-4">No hay usuarios</p>}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-100 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cursos ({courses.length})</h2>
              <button onClick={openNewCourse} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                <Plus className="w-4 h-4" /> Nuevo Curso
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-200 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white truncate">{course.title}</div>
                    <div className="text-sm text-gray-500">{course.category?.name} • {course._count?.lessons || 0} lecciones</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditCourse(course)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteCourse(course.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    <button onClick={() => togglePublish(course.id, course.published)} className={`px-3 py-1 rounded-lg text-sm font-medium ${course.published ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                      {course.published ? 'Publicado' : 'Borrador'}
                    </button>
                  </div>
                </div>
              ))}
              {courses.length === 0 && <p className="text-gray-500 text-center py-4">No hay cursos</p>}
            </div>
          </div>
        </div>
      </div>

      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-dark-100 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingCourse ? 'Editar Curso' : 'Nuevo Curso'}</h2>
              <button onClick={() => setShowCourseModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título *</label><input value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white" /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug *</label><input value={courseForm.slug} onChange={(e) => setCourseForm({...courseForm, slug: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white" /></div>
              </div>
              
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label><textarea value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white" rows={2} /></div>
              
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dificultad</label><select value={courseForm.difficulty} onChange={(e) => setCourseForm({...courseForm, difficulty: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white">
                  <option value="BEGINNER">Junior</option><option value="INTERMEDIATE">Senior</option><option value="ADVANCED">Master</option><option value="EXTREME">Tech Lead</option>
                </select></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duración</label><input value={courseForm.duration} onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})} placeholder="ej: 6 horas" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white" /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Orden</label><input type="number" value={courseForm.order} onChange={(e) => setCourseForm({...courseForm, order: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white" /></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría *</label><select value={courseForm.categoryId} onChange={(e) => setCourseForm({...courseForm, categoryId: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white">
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select></div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={courseForm.published} onChange={(e) => setCourseForm({...courseForm, published: e.target.checked})} id="published" className="w-4 h-4" />
                  <label htmlFor="published" className="text-gray-700 dark:text-gray-300">Publicar curso</label>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Lecciones ({courseForm.lessons.length})</h3>
                <div className="space-y-2 mb-4">
                  {courseForm.lessons.map((lesson, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-200 rounded-lg">
                      <div className="flex-1"><span className="text-gray-900 dark:text-white">{i + 1}. {lesson.title}</span></div>
                      <button onClick={() => removeLesson(i)} className="text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input placeholder="Título lección" value={lessonForm.title} onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white text-sm" />
                  <input placeholder="Slug" value={lessonForm.slug} onChange={(e) => setLessonForm({...lessonForm, slug: e.target.value})} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white text-sm" />
                  <button onClick={addLesson} className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">Agregar</button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowCourseModal(false)} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Cancelar</button>
              <button onClick={handleSaveCourse} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"><Save className="w-4 h-4" /> Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}