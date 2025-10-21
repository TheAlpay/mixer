import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/kutuphane', label: 'Kütüphane' },
    { path: '/sozluk', label: 'Sözlük' },
    { path: '/mixer', label: 'Mixer' },
    { path: '/hakkimizda', label: 'Hakkımızda' },
    { path: '/iletisim', label: 'İletişim' },
  ];

  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-neutral-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-light tracking-tight text-black hover:text-neutral-600 transition-colors"
            >
              MIXER
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-light tracking-wide transition-colors ${
                    location.pathname === link.path
                      ? 'text-black border-b-2 border-black pb-1'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-neutral-200 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm font-light tracking-wide transition-colors ${
                    location.pathname === link.path
                      ? 'text-black font-normal'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main>{children}</main>

      <footer className="border-t border-neutral-200 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600 font-light">
          <div>© 2025 MIXER. Tüm hakları saklıdır.</div>
          <div className="flex gap-6">
            <Link to="/hakkimizda" className="hover:text-black transition-colors">
              Hakkımızda
            </Link>
            <Link to="/iletisim" className="hover:text-black transition-colors">
              İletişim
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
