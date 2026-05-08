import { useState, useEffect } from 'react';
import { Clock, MapPin, RefreshCw } from 'lucide-react';
import type { QueueHourData, OfficeData } from '../../lib/types';

interface QueueChartProps {
  data: QueueHourData[];
  offices: OfficeData[];
  officeName: string;
  city: string;
  visible: boolean;
  onBook: () => void;
}

export function QueueChart({ data, offices, officeName, city, visible, onBook }: QueueChartProps) {
  const [animated, setAnimated] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimated(true), 100);
      setLastUpdated('Updated just now');
      return () => clearTimeout(t);
    }
  }, [visible]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated('Updated just now');
    }, 800);
  };

  const getBarColor = (busyness: number, isRecommended: boolean) => {
    if (isRecommended) return 'bg-[#22C55E]';
    if (busyness >= 80) return 'bg-red-400';
    if (busyness >= 60) return 'bg-amber-400';
    return 'bg-blue-300';
  };

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case 'low': return { text: 'Low crowd', color: 'bg-green-50 text-green-700 border-green-200' };
      case 'medium': return { text: 'Moderate', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'high': return { text: 'Busy', color: 'bg-red-50 text-red-700 border-red-200' };
      default: return { text: 'Unknown', color: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  const recommendedSlot = data.find((d) => d.isRecommended);

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Best time to visit — {officeName}, {city}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#22C55E] rounded-sm inline-block" /> Recommended</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded-sm inline-block" /> Peak</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-300 rounded-sm inline-block" /> Low</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0F2A5E] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{lastUpdated}</span>
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Bar Chart */}
        <div className="flex items-end gap-1 h-28 mb-2">
          {data.map((d, i) => (
            <div key={d.hour} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="w-full relative flex items-end justify-center" style={{ height: '80px' }}>
                <div
                  className={`w-full rounded-t transition-all duration-700 cursor-pointer ${getBarColor(d.busyness, d.isRecommended)}`}
                  style={{
                    height: animated ? `${d.busyness}%` : '0%',
                    transitionDelay: `${i * 50}ms`,
                  }}
                />
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {d.hour}: {d.busyness}% busy
                </div>
              </div>
              <span className="text-[9px] text-gray-400" style={{ transform: 'rotate(45deg)', transformOrigin: 'left' }}>
                {d.hour}
              </span>
            </div>
          ))}
        </div>

        {/* Recommended slot */}
        {recommendedSlot && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#22C55E]" />
            <p className="text-sm text-green-800 font-medium">
              Recommended: Tuesday {recommendedSlot.hour} — {100 - recommendedSlot.busyness}% less crowded
            </p>
          </div>
        )}

        {/* Office Tabs */}
        <div className="space-y-2">
          {offices.map((o, i) => {
            const badge = getCrowdBadge(o.crowdLevel);
            return (
              <button
                key={o.name}
                onClick={() => setSelectedOffice(i)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all border ${
                  selectedOffice === i
                    ? 'border-[#0F2A5E] bg-blue-50 text-[#0F2A5E]'
                    : 'border-gray-100 hover:border-gray-200 text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-medium">{o.name}</span>
                  <span className="text-gray-400 text-xs">{o.distance}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${badge.color}`}>
                    {badge.text}
                  </span>
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{o.wait}</span>
                  {o.recommended && <span className="text-[#22C55E] text-xs font-bold">✓</span>}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onBook}
          className="mt-4 w-full bg-[#0F2A5E] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#1a3a7a] transition-colors shadow-md"
        >
          Book Tuesday {recommendedSlot?.hour ?? '8am'} →
        </button>
      </div>
    </div>
  );
}
