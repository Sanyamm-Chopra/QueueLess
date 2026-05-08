import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface DocumentChecklistProps {
  title: string;
  documents: string[];
  visible: boolean;
  onUpload: () => void;
}

export function DocumentChecklist({ title, documents, visible, onUpload }: DocumentChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const allChecked = checked.size === documents.length;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="px-5 py-4 bg-blue-50 border-b border-blue-100">
        <p className="text-sm font-semibold text-[#0F2A5E]">{title}</p>
        <p className="text-xs text-blue-400 mt-0.5">Check off documents you have ready</p>
      </div>
      <div className="px-5 py-4">
        <ul className="space-y-2.5">
          {documents.map((doc, i) => (
            <li
              key={doc}
              onClick={() => toggle(i)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                checked.has(i) ? 'bg-green-50' : 'hover:bg-gray-50'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  checked.has(i)
                    ? 'bg-[#22C55E] border-[#22C55E]'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {checked.has(i) && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm transition-colors ${checked.has(i) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {doc}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={onUpload}
          disabled={!allChecked}
          className={`mt-4 w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            allChecked
              ? 'bg-[#0F2A5E] text-white hover:bg-[#1a3a7a] shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {allChecked ? 'Upload Documents →' : `Check all documents to continue (${checked.size}/${documents.length})`}
        </button>
      </div>
    </div>
  );
}
