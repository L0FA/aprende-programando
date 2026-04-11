import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { api } from '../api';

export default function Admin() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      api.admin.getStats().then(setStats).catch(console.error);
      api.admin.getUsers().then(setUsers).catch(console.error);
    }
  }, [user]);

  if (!user || user.role !== 'ADMIN') {
    return <div className="p-8 text-center">No tienes acceso a esta página</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Panel de Admin</h1>
      
      {stats && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-gray-500 mb-2">Usuarios</h3>
            <p className="text-3xl font-bold text-primary-500">{stats.totalUsers}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-500 mb-2">Cursos</h3>
            <p className="text-3xl font-bold text-primary-500">{stats.totalCourses}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-500 mb-2">Categorías</h3>
            <p className="text-3xl font-bold text-primary-500">{stats.totalCategories}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-500 mb-2">Lecciones</h3>
            <p className="text-3xl font-bold text-primary-500">{stats.totalLessons}</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Usuarios</h2>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Nombre</th>
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Email</th>
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-200 dark:border-gray-800">
                <td className="px-4 py-3 text-gray-900 dark:text-white">{u.name}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{u.email}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}