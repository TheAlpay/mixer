import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, ExternalLink, FileText, Image, Video, Code } from 'lucide-react';
import type { Database } from '../lib/database.types';

type LibraryItem = Database['public']['Tables']['library_items']['Row'];

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data, error } = await supabase
      .from('library_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  }

  function getIcon(contentType: string) {
    switch (contentType) {
      case 'pdf':
        return <FileText className="w-5 h-5" strokeWidth={1.5} />;
      case 'image':
        return <Image className="w-5 h-5" strokeWidth={1.5} />;
      case 'video':
        return <Video className="w-5 h-5" strokeWidth={1.5} />;
      case 'iframe':
        return <Code className="w-5 h-5" strokeWidth={1.5} />;
      default:
        return <FileText className="w-5 h-5" strokeWidth={1.5} />;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-neutral-600 font-light">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-black">
              Kütüphane
            </h1>
            <div className="h-px w-24 bg-black"></div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-light">Yeni Ekle</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-neutral-600 font-light">
            Henüz içerik eklenmemiş.
          </div>
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <a
                key={item.id}
                href={`/kutuphane/${item.id}`}
                className="group border border-neutral-200 hover:border-black transition-all p-6 flex items-start gap-4"
              >
                <div className="text-neutral-600 group-hover:text-black transition-colors">
                  {getIcon(item.content_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-light text-black group-hover:underline mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 font-light line-clamp-2">
                    {item.preview_text || item.description}
                  </p>
                </div>
                <ExternalLink
                  className="w-5 h-5 text-neutral-400 group-hover:text-black transition-colors flex-shrink-0"
                  strokeWidth={1.5}
                />
              </a>
            ))}
          </div>
        )}
      </div>

      {showAddForm && (
        <AddItemModal onClose={() => setShowAddForm(false)} onSuccess={loadItems} />
      )}
    </div>
  );
}

function AddItemModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_type: 'pdf' as 'pdf' | 'image' | 'video' | 'iframe',
    file_url: '',
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const previewText = formData.description.split(' ').slice(0, 20).join(' ');

    const { error } = await supabase.from('library_items').insert({
      ...formData,
      preview_text: previewText,
    });

    if (!error) {
      onSuccess();
      onClose();
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-light text-black mb-6">Yeni İçerik Ekle</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-light text-neutral-700 mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-light text-neutral-700 mb-2">
              İçerik Türü
            </label>
            <select
              value={formData.content_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content_type: e.target.value as 'pdf' | 'image' | 'video' | 'iframe',
                })
              }
              className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
            >
              <option value="pdf">PDF</option>
              <option value="image">Görsel</option>
              <option value="video">Video</option>
              <option value="iframe">Embed/İframe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-light text-neutral-700 mb-2">
              Dosya URL
            </label>
            <input
              type="url"
              value={formData.file_url}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-light text-neutral-700 mb-2">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-neutral-300 px-4 py-2 h-32 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-neutral-300 hover:border-black transition-colors font-light"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-black text-white hover:bg-neutral-800 transition-colors font-light disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
