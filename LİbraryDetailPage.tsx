import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Download } from 'lucide-react';
import type { Database } from '../lib/database.types';

type LibraryItem = Database['public']['Tables']['library_items']['Row'];

export default function LibraryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<LibraryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  async function loadItem() {
    if (!id) return;

    const { data, error } = await supabase
      .from('library_items')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      setItem(data);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-neutral-600 font-light">Yükleniyor...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-neutral-600 font-light">İçerik bulunamadı.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate('/kutuphane')}
          className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-8 font-light"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          <span>Kütüphaneye Dön</span>
        </button>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4">
              {item.title}
            </h1>
            <div className="h-px w-24 bg-black"></div>
          </div>

          <p className="text-lg text-neutral-700 font-light leading-relaxed">
            {item.description}
          </p>

          <div className="border border-neutral-200 p-2">
            {item.content_type === 'pdf' && (
              <iframe
                src={item.file_url}
                className="w-full h-[800px]"
                title={item.title}
              />
            )}

            {item.content_type === 'image' && (
              <img
                src={item.file_url}
                alt={item.title}
                className="w-full h-auto"
              />
            )}

            {item.content_type === 'video' && (
              <video
                src={item.file_url}
                controls
                className="w-full h-auto"
              />
            )}

            {item.content_type === 'iframe' && (
              <div
                className="w-full h-[600px]"
                dangerouslySetInnerHTML={{ __html: item.file_url }}
              />
            )}
          </div>

          <div className="flex justify-end">
            <a
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
            >
              <Download className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-light">İndir / Aç</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
