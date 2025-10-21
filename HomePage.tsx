import { Link } from 'react-router-dom';
import { FlaskConical, Library, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-black">
              MIXER
            </h1>
            <div className="h-px w-32 bg-black mx-auto"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-extralight text-black leading-tight">
            Veri Odaklı Yaşam Bilimi.
          </h2>

          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto font-light leading-relaxed">
            Gelişiminizi maksimize etmek için tasarlanmış bilgi aracı.
            Analizlere hızla erişin, kişiselleştirilmiş verileri keşfedin.
          </p>

          <div className="flex justify-center items-center py-12">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-tr from-cyan-800/30 to-blue-800/30 rounded-full animate-pulse delay-75"></div>
              <div className="absolute inset-8 bg-gradient-to-bl from-cyan-700/40 to-blue-700/40 rounded-full animate-pulse delay-150"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FlaskConical className="w-16 h-16 text-cyan-900" strokeWidth={1} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link
              to="/kutuphane"
              className="group flex items-center gap-3 px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-all duration-300 min-w-[200px] justify-center"
            >
              <Library className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm tracking-wider font-light">KÜTÜPHANE</span>
            </Link>

            <Link
              to="/mixer"
              className="group flex items-center gap-3 px-8 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 min-w-[200px] justify-center"
            >
              <FlaskConical className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm tracking-wider font-light">MIXER</span>
            </Link>

            <Link
              to="/sozluk"
              className="group flex items-center gap-3 px-8 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 min-w-[200px] justify-center"
            >
              <BookOpen className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-sm tracking-wider font-light">SÖZLÜK</span>
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-8 px-6 border-t border-neutral-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600 font-light">
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
