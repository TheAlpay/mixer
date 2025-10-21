import { Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-black">
            Hakkımızda
          </h1>
          <div className="h-px w-24 bg-black mx-auto"></div>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-cyan-900" strokeWidth={1} />
              <h2 className="text-3xl font-light text-black">Misyon</h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="text-lg text-neutral-700 leading-relaxed font-light">
                Misyonumuz, bilginin erişilebilirliğini artırmak ve bireysel sağlığı
                destekleyen verileri filtresiz sunmaktır.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed font-light">
                Blog ve video içerikleriyle haftalık bilgi akışını sürdürerek topluluğumuzu
                güçlendirmek ve bilimsel temelli kararlar almalarına yardımcı olmak.
              </p>
            </div>
          </section>

          <div className="h-px bg-neutral-200"></div>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <Eye className="w-8 h-8 text-cyan-900" strokeWidth={1} />
              <h2 className="text-3xl font-light text-black">Vizyon</h2>
            </div>
            <div className="pl-12">
              <p className="text-lg text-neutral-700 leading-relaxed font-light">
                MIXER, supplement ve biyolojik veri analizi alanında en güvenilir, tarafsız
                ve kullanıcı odaklı referans platformu olmaktır.
              </p>
            </div>
          </section>

          <div className="h-px bg-neutral-200"></div>

          <section className="space-y-6">
            <h2 className="text-3xl font-light text-black">Yaklaşımımız</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="h-1 w-12 bg-cyan-900"></div>
                <h3 className="text-xl font-light text-black">Bilimsel</h3>
                <p className="text-neutral-600 font-light leading-relaxed">
                  Tüm önerilerimiz akademik yayınlara ve bilimsel verilere dayanır.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-1 w-12 bg-cyan-900"></div>
                <h3 className="text-xl font-light text-black">Tarafsız</h3>
                <p className="text-neutral-600 font-light leading-relaxed">
                  Herhangi bir ürün veya marka bağımlılığı olmaksızın objektif analiz.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-1 w-12 bg-cyan-900"></div>
                <h3 className="text-xl font-light text-black">Kişisel</h3>
                <p className="text-neutral-600 font-light leading-relaxed">
                  Bireysel ihtiyaçlarınıza özel, veri odaklı çözümler.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
