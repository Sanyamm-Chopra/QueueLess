import type { StepId } from '../../lib/types';
import { STEPS } from '../../lib/mock-data';

interface ProgressTrackerProps {
  currentStep: StepId;
}

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div
                className={`flex-1 flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-500 text-xs font-medium ${
                  i <= stepIndex
                    ? 'bg-[#0F2A5E] text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 transition-all duration-300 ${
                    i < stepIndex
                      ? 'bg-[#22C55E] text-white'
                      : i === stepIndex
                      ? 'bg-white text-[#0F2A5E]'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  {i < stepIndex ? '✓' : i + 1}
                </span>
                <span className="hidden sm:inline truncate">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-2 sm:w-3 h-0.5 mx-0.5 rounded transition-colors duration-500 ${
                    i < stepIndex ? 'bg-[#22C55E]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
