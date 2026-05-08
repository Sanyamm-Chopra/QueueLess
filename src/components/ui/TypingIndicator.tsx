export function TypingIndicator({ agent }: { agent: string }) {
  return (
    <div className="flex flex-col gap-1 max-w-xs animate-fade-up">
      <span className="text-xs text-gray-400 font-medium px-1">{agent}</span>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full block" />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full block" />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full block" />
      </div>
    </div>
  );
}
