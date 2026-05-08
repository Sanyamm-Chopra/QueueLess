import { CheckCircle, Clock, MapPin, FileText, MessageSquare } from 'lucide-react';
import type { ScenarioConfig } from '../../lib/types';

interface WhatsAppCardProps {
  scenario: ScenarioConfig;
  visible: boolean;
}

export function WhatsAppCard({ scenario, visible }: WhatsAppCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-green-200 shadow-md overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      {/* Green header */}
      <div className="bg-[#22C55E] px-5 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">QueueLess AI Reminder</p>
          <p className="text-xs text-green-100">Sent to your WhatsApp</p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-[#0F2A5E]" />
          <span className="font-medium text-gray-800">{scenario.officeName}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{scenario.officeCity}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-[#22C55E]" />
          <span className="text-gray-700">Tuesday, 8:00 AM</span>
          <span className="text-gray-400">·</span>
          <span className="text-green-600 font-medium">~14 min wait</span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <FileText className="w-4 h-4 text-amber-500 mt-0.5" />
          <div>
            <p className="font-medium text-gray-800">{scenario.documents.length} documents required</p>
            <p className="text-xs text-gray-500 mt-0.5">{scenario.documents.slice(0, 3).join(', ')}...</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Fee:</span>
          <span className="font-medium text-gray-800">{scenario.feeAmount}</span>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#22C55E]" />
          <span className="text-xs text-green-700 font-medium">
            Reminder set: You'll be notified 1 hour before your visit
          </span>
        </div>
      </div>
    </div>
  );
}
