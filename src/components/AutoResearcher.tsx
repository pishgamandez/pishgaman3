/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, BrainCircuit, Wand2 } from 'lucide-react';

export const AutoResearcher: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    // Simulating research
    await new Promise(r => setTimeout(r, 2000));
    setResult(`نتایج تحقیق برای: ${topic}\n\n۱. تحلیل بازار: تقاضای بالا برای راهکارهای ارگانیک.\n۲. مزایای علمی: بهبود ساختار خاک و ریشه‌زایی.\n۳. شعار پیشنهادی: "اوج بهره‌وری با تکنولوژی نوین."`);
    setLoading(false);
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center gap-3">
        <BrainCircuit className="w-6 h-6 text-indigo-400" />
        <h3 className="text-lg font-bold text-white">تحقیق‌گر هوشمند</h3>
      </div>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="موضوع محصول یا تحقیق را وارد کنید..."
        className="w-full bg-slate-950 text-white text-sm px-4 py-3 rounded-xl border border-slate-700"
      />
      <button
        onClick={handleSearch}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" />
        {loading ? 'در حال جستجو و تحلیل...' : 'شروع تحقیق اتوماتیک'}
      </button>
      {result && (
        <pre className="mt-4 p-4 bg-slate-950 rounded-xl text-xs text-slate-300 whitespace-pre-wrap font-sans">
          {result}
        </pre>
      )}
    </div>
  );
};
