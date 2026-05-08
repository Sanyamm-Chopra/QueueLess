import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ScanLine } from 'lucide-react';
import type { DocCheckItem } from '../../lib/types';

interface DocumentValidatorProps {
  checks: DocCheckItem[];
  visible: boolean;
  onComplete: () => void;
}

export function DocumentValidator({ checks, visible, onComplete }: DocumentValidatorProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [scanning, setScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  // Scanning animation
  useEffect(() => {
    if (!visible) return;
    setScanning(true);
    setScanProgress(0);
    setRevealedCount(0);

    const progressInterval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    const scanTimer = setTimeout(() => {
      setScanning(false);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(scanTimer);
    };
  }, [visible]);

  // Staggered reveal of check results
  useEffect(() => {
    if (scanning || !visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setRevealedCount(i);
      if (i >= checks.length) {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 280);
    return () => clearInterval(interval);
  }, [scanning, visible, checks.length, onComplete]);

  const failCount = checks.filter((c) => !c.ok).length;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          {scanning ? (
            <>
              <ScanLine className="w-4 h-4 text-[#0F2A5E] animate-pulse" />
              Scanning documents...
            </>
          ) : (
            'Document Validation Results'
          )}
        </p>
        {scanning && (
          <span className="text-xs text-gray-400 font-medium">{scanProgress}%</span>
        )}
      </div>

      {/* Scan progress bar */}
      {scanning && (
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-[#0F2A5E] transition-all duration-100 ease-linear"
            style={{ width: `${scanProgress}%` }}
          />
        </div>
      )}

      <div className="px-5 py-4 space-y-2.5">
        {checks.map((c, i) => (
          <div
            key={c.label}
            className={`flex items-start gap-3 p-2.5 rounded-lg transition-all duration-400 ${
              i < revealedCount
                ? c.ok
                  ? 'bg-green-50/80'
                  : 'bg-red-50/80'
                : 'opacity-0 h-0 overflow-hidden'
            }`}
            style={{
              transition: 'all 0.4s ease',
            }}
          >
            {c.ok ? (
              <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-gray-800">{c.label}</span>
                {i < revealedCount && (
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {c.confidence}% confidence
                  </span>
                )}
              </div>
              <span className={`text-sm ${c.ok ? 'text-gray-500' : 'text-red-600 font-medium'}`}>
                {c.result}
              </span>
            </div>
          </div>
        ))}

        {revealedCount >= checks.length && failCount > 0 && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-2 animate-fade-up">
            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700 font-medium">
              {failCount} issue{failCount > 1 ? 's' : ''} found — re-upload the flagged document{failCount > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {revealedCount >= checks.length && failCount === 0 && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2 animate-fade-up">
            <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
            <p className="text-sm text-green-700 font-medium">
              All documents validated — proceeding to queue analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
