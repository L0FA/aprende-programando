import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Aprende Programando | Cursos de Código desde Cero',
  description: 'Domina los editores de código, aprende IA y conviértete en desarrollador.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className="bg-white dark:bg-dark-300 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">
              <PageTransition>{children}</PageTransition>
            </main>
            <footer className="bg-gray-100 dark:bg-dark-200 border-t border-gray-200 dark:border-gray-800 py-8 mt-20 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <p>Aprende Programando © 2024</p>
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}