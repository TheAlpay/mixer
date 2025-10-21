import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AlertTriangle, FlaskConical } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Complaint = Database['public']['Tables']['complaints']['Row'];
type Supplement = Database['public']['Tables']['supplements']['Row'];

interface FormData {
  age: string;
  height: string;
  weight: string;
  complaints: string[];
}

interface Recommendation {
  supplement: string;
  dosage: string;
  sideEffects: string;
  riskLevel: number;
  successRate: string;
}

export default function MixerPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    height: '',
    weight: '',
    complaints: [],
  });
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [complaintsRes, supplementsRes] = await Promise.all([
      supabase.from('complaints').select('*').order('name'),
      supabase.from('supplements').select('*').order('name'),
    ]);

    if (complaintsRes.data) setComplaints(complaintsRes.data);
    if (supplementsRes.data) setSupplements(supplementsRes.data);
    setLoading(false);
  }

  function handleComplaintToggle(complaintId: string) {
    setFormData((prev) => ({
      ...prev,
      complaints: prev.complaints.includes(complaintId)
        ? prev.complaints.filter((id) => id !== complaintId)
        : [...prev.complaints, complaintId],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!riskAccepted) {
      alert('Lütfen risk kabul formunu işaretleyin.');
      return;
    }

    setGenerating(true);

    const age = parseInt(formData.age);
    const selectedComplaints = complaints.filter((c) =>
      formData.complaints.includes(c.id)
    );

    const generatedRecommendations = generateRecommendations(
      age,
      selectedComplaints,
      supplements
    );

    setRecommendations(generatedRecommendations);

    await supabase.from('mixer_recommendations').insert({
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      complaints: formData.complaints,
      recommendations: generatedRecommendations,
      risk_accepted: riskAccepted,
    });

    setShowResults(true);
    setGenerating(false);
  }

  function generateRecommendations(
    age: number,
    selectedComplaints: Complaint[],
    allSupplements: Supplement[]
  ): Recommendation[] {
    const results: Recommendation[] = [];

    const suitable = allSupplements.filter((supp) => {
      const ageRestrictions = supp.age_restrictions as any;
      if (ageRestrictions?.minAge && age < ageRestrictions.minAge) return false;
      if (ageRestrictions?.maxAge && age > ageRestrictions.maxAge) return false;
      return true;
    });

    const selected = suitable.slice(0, Math.min(5, suitable.length));

    selected.forEach((supp) => {
      results.push({
        supplement: supp.name,
        dosage: supp.default_dosage || 'Doktora danışınız',
        sideEffects: supp.side_effects || 'Bilgi mevcut değil',
        riskLevel: supp.risk_level,
        successRate: 'Orta',
      });
    });

    return results;
  }

  function resetForm() {
    setFormData({ age: '', height: '', weight: '', complaints: [] });
    setRiskAccepted(false);
    setRecommendations([]);
    setShowResults(false);
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
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center mb-4">
            <FlaskConical className="w-16 h-16 text-cyan-900" strokeWidth={1} />
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-black">
            MIXER
          </h1>
          <div className="h-px w-24 bg-black mx-auto"></div>
          <p className="text-neutral-600 font-light max-w-2xl mx-auto">
            Kişiselleştirilmiş supplement önerileri için bilgilerinizi girin.
          </p>
        </div>

        {!showResults ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-light text-neutral-700 mb-2">
                  Yaş
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
                  required
                  min="1"
                  max="150"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-neutral-700 mb-2">
                  Boy (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
                  required
                  min="1"
                  max="300"
                />
              </div>

              <div>
                <label className="block text-sm font-light text-neutral-700 mb-2">
                  Kilo (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black"
                  required
                  min="1"
                  max="500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-neutral-700 mb-4">
                Şikayetler (Birden fazla seçebilirsiniz)
              </label>
              <div className="border border-neutral-300 p-6 max-h-80 overflow-y-auto">
                {complaints.length === 0 ? (
                  <p className="text-neutral-600 font-light text-center py-8">
                    Henüz şikayet eklenmemiş.
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-3">
                    {complaints.map((complaint) => (
                      <label
                        key={complaint.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 p-2 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.complaints.includes(complaint.id)}
                          onChange={() => handleComplaintToggle(complaint.id)}
                          className="w-4 h-4"
                        />
                        <span className="font-light text-neutral-700">
                          {complaint.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-600 p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-normal text-red-900 mb-3">
                    TIBBİ SORUMLULUK REDDİ VE RİSK KABULÜ
                  </h3>
                  <p className="text-sm text-red-800 font-light leading-relaxed mb-4">
                    Bu platform tarafından sunulan öneriler kişiselleştirilmiş sağlık
                    tavsiyesi, teşhis veya tedavi değildir. Herhangi bir supplement
                    kullanmadan önce mutlaka bir uzmana (doktor veya diyetisyen) danışınız.
                    Bu önerileri kullanarak oluşabilecek tüm riskleri (yan etkiler, sağlık
                    sorunları ve ölüm dahil) kabul ettiğinizi beyan edersiniz.
                  </p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={riskAccepted}
                      onChange={(e) => setRiskAccepted(e.target.checked)}
                      className="w-5 h-5"
                      required
                    />
                    <span className="text-sm font-normal text-red-900">
                      Okudum, anladım ve tüm riskleri kabul ediyorum.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={generating || !riskAccepted}
                className="px-12 py-4 bg-black text-white hover:bg-neutral-800 transition-colors font-light disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? 'Analiz Ediliyor...' : 'Önerileri Oluştur'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="bg-red-600 text-white p-6 text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-normal leading-relaxed">
                UYARI: BU ÖNERİLER KİŞİSELLEŞTİRİLMİŞ SAĞLIK TAVSİYESİ DEĞİLDİR.
                <br />
                TEŞHİS, TEDAVİ VEYA İLAÇ YERİNE GEÇMEZ.
                <br />
                KULLANMADAN ÖNCE KESİNLİKLE BİR UZMANA DANIŞINIZ.
                <br />
                RİSK KABUL EDİLMİŞTİR.
              </p>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="border border-neutral-300 p-6">
                  <h3 className="text-2xl font-light text-black mb-4">
                    {rec.supplement}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-neutral-600 mb-1">Önerilen Doz</div>
                      <div className="font-light">{rec.dosage}</div>
                    </div>

                    <div>
                      <div className="text-sm text-neutral-600 mb-1">
                        Muhtemel Yan Etkiler
                      </div>
                      <div className="font-light">{rec.sideEffects}</div>
                    </div>

                    <div>
                      <div className="text-sm text-neutral-600 mb-1">Risk Seviyesi</div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-8 ${
                                level <= rec.riskLevel
                                  ? 'bg-red-600'
                                  : 'bg-neutral-200'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className="font-light">{rec.riskLevel}/5</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-neutral-600 mb-1">
                        Tedavi Başarı Oranı
                      </div>
                      <div className="font-light">{rec.successRate}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={resetForm}
                className="px-12 py-4 border border-black hover:bg-black hover:text-white transition-colors font-light"
              >
                Yeni Analiz Yap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
