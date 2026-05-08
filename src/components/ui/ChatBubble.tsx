import type { Message } from '../../lib/types';
import { getLanguageFlag, getLanguageLabel } from '../../lib/language';

interface ChatBubbleProps {
  message: Message;
  showLang?: boolean;
}

export function ChatBubble({ message, showLang }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'} animate-fade-up`}>
      {!isUser && message.agent && (
        <span className="text-xs text-gray-400 font-medium px-1 flex items-center gap-1.5">
          {message.agent}
        </span>
      )}
      <div
        className={`max-w-[85%] sm:max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#0F2A5E] text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
        }`}
      >
        {message.content.split('**').map((part, i) =>
          i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
        )}
      </div>
      <div className="flex items-center gap-2 px-1">
        <span className="text-[10px] text-gray-300">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {showLang && message.lang && message.lang !== 'en' && (
          <span className="text-[10px] bg-blue-50 text-[#0F2A5E] px-1.5 py-0.5 rounded-full font-medium border border-blue-100">
            {getLanguageFlag(message.lang)} {getLanguageLabel(message.lang)}
          </span>
        )}
      </div>
    </div>
  );
}
