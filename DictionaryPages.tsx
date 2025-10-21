import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Plus } from 'lucide-react';
import type { Database } from '../lib/database.types';

type DictionaryEntry = Database['public']['Tables']['dictionary_entries']['Row'];

export default function DictionaryPage() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<DictionaryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = entries.filter(
        (entry) =>
          entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }
  }, [searchTerm, entries]);

  async function loadEntries() {
    const { data, error } = await supabase
      .from('dictionary_entries')
      .select('*')
      .order('term', { ascending: true });

    if (!error && data) {
      setEntries(data);
      setFilteredEntries(data);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-black">
              Sözlük
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

        <div className="mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Terim veya tanım ara..."
              className="w-full border border-neutral-300 pl-12 pr-4 py-3 focus:outline-none focus:border-black font-light"
            />
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 text-neutral-600 font-light">
            {searchTerm ? 'Sonuç bulunamadı.' : 'Henüz terim eklenmemiş.'}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="border border-neutral-200 p-6 hover:border-black transition-colors"
              >
                <h3 className="text-xl font-light text-black mb-3">{entry.term}</h3>
                <p className="text-neutral-700 font-light leading-relaxed">
                  {entry.definition}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddForm && (
        <AddEntryModal onClose={() => setShowAddForm(false)} onSuccess={loadEntries} />
      )}
    </div>
  );
}

function AddEntryModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from('dictionary_entries').insert(formData);

    if (!error) {
      onSuccess();
      onClose();
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white max-w-2xl w-full p-8">
        <h2 className="text-3xl font-light text-black mb-6">Yeni Terim Ekle</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-light text-neutral-700 mb-2">
              Terim
            </label>
            <input
              type="text"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-light text-neutral-700 mb-2">
              Tanım
            </label>
            <textarea
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
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
