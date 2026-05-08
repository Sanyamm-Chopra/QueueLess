import { useState } from 'react';
import { Phone, CheckCircle, MessageSquare } from 'lucide-react';
import type { WorkflowStep } from '../../lib/types';

interface WorkflowPlanProps {
  steps: WorkflowStep[];
  officeName: string;
  city: string;
  feeAmount: string;
  visible: boolean;
  onSendWhatsapp: () => void;
}

export function WorkflowPlan({ steps, officeName, city, feeAmount, visible, onSendWhatsapp }: WorkflowPlanProps) {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (n: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  const handleSend = () => {
    if (phone.trim().length >= 10) {
      setSent(true);
      onSendWhatsapp();
    }
  };

  const totalMinutes = steps.length * 12;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="px-5 py-4 bg-[#0F2A5E]">
        <p className="text-sm font-semibold text-white">Your visit plan — Tuesday, 8:00 AM</p>
        <p className="text-xs text-blue-200 mt-0.5">
          {officeName}, {city} · Fee: {feeAmount} · Est. ~{totalMinutes} min
        </p>
      </div>

      <div className="px-5 py-5">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-4 relative transition-all duration-300 ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <button
                  onClick={() => toggleStep(s.n)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-bold transition-all duration-300 ${
                    completedSteps.has(s.n)
                      ? 'bg-[#22C55E] text-white'
                      : 'bg-[#0F2A5E] text-white'
                  }`}
                >
                  {completedSteps.has(s.n) ? '✓' : s.n}
                </button>
                <div className={`pt-1 flex-1 ${completedSteps.has(s.n) ? 'opacity-50' : ''}`}>
                  <p className={`text-sm font-medium ${completedSteps.has(s.n) ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {s.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.detail}</p>
                  <span className="inline-block mt-1 text-xs bg-blue-50 text-[#0F2A5E] px-2 py-0.5 rounded-full">
                    {s.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Section */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Send this plan to WhatsApp
          </p>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2 animate-fade-up">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
              <div>
                <p className="text-sm font-semibold text-green-800">Plan sent to WhatsApp!</p>
                <p className="text-xs text-green-600 mt-0.5">You'll receive a reminder 1 hour before your slot.</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2A5E]/20 focus:border-[#0F2A5E] transition-all"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={phone.trim().length < 10}
                className="px-4 py-2.5 bg-[#22C55E] text-white text-sm font-semibold rounded-lg hover:bg-green-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
              >
                Send →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
