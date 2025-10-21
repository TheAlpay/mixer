import { Mail, Phone, Instagram } from 'lucide-react';

export default function ContactPage() {
  const founders = [
    {
      name: 'A. Alpay',
      instagram: 'https://www.instagram.com/alpay.dev',
      phone: '545 586 52 01',
      email: 'alpay@mtive.tech',
    },
    {
      name: 'Metehan Y.',
      instagram: 'https://www.instagram.com/metehanyasarr?igsh=YzI1Mzg1azh3aGh3',
      phone: '+90 555 756 76 12',
      email: 'metuis1661@gmail.com',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-black">
            İletişim
          </h1>
          <div className="h-px w-24 bg-black mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="bg-neutral-50 border border-neutral-200 p-8 space-y-6"
            >
              <h2 className="text-2xl font-light text-black tracking-wide">
                {founder.name}
              </h2>
              <div className="h-px bg-neutral-300"></div>

              <div className="space-y-4">
                <a
                  href={founder.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neutral-700 hover:text-black transition-colors group"
                >
                  <Instagram className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-light group-hover:underline">Instagram</span>
                </a>

                <a
                  href={`tel:${founder.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-neutral-700 hover:text-black transition-colors group"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-light">{founder.phone}</span>
                </a>

                <a
                  href={`mailto:${founder.email}`}
                  className="flex items-center gap-3 text-neutral-700 hover:text-black transition-colors group"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-light break-all group-hover:underline">
                    {founder.email}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
            İşbirliği, öneri ve sorularınız için ekibimizle iletişime geçebilirsiniz.
            Size en kısa sürede dönüş yapacağız.
          </p>
        </div>
      </div>
    </div>
  );
}
