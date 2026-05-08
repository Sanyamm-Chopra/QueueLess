import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Paperclip, MessageSquare } from 'lucide-react';

import { ProgressTracker } from '../components/ui/ProgressTracker';
import { TypingIndicator } from '../components/ui/TypingIndicator';
import { ChatBubble } from '../components/ui/ChatBubble';
import { DocumentChecklist } from '../components/ui/DocumentChecklist';
import { DocumentValidator } from '../components/ui/DocumentValidator';
import { QueueChart } from '../components/ui/QueueChart';
import { WorkflowPlan } from '../components/ui/WorkflowPlan';
import { WhatsAppCard } from '../components/ui/WhatsAppCard';

import { SCENARIOS, INITIAL_GREETING, generateQueueData, generateOffices, generateDocValidation } from '../lib/mock-data';
import { planConversation, getAgentLabel } from '../lib/conversation';
import { detectLanguage, getLanguageFlag, getLanguageLabel } from '../lib/language';

import type { Message, StepId, CardType, AgentId, ScenarioConfig, DocCheckItem, QueueHourData, OfficeData } from '../lib/types';

// ─── Main Chat Page ───────────────────────────────────────────────────────────

export default function Chat() {
  const [searchParams] = useSearchParams();

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [thinkingAgent, setThinkingAgent] = useState('');

  // Flow state
  const [currentStep, setCurrentStep] = useState<StepId>('understand');
  const [activeScenario, setActiveScenario] = useState<ScenarioConfig | null>(null);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);

  // Card visibility
  const [visibleCards, setVisibleCards] = useState<Set<CardType>>(new Set());

  // Card data
  const [docChecks, setDocChecks] = useState<DocCheckItem[]>([]);
  const [queueData, setQueueData] = useState<QueueHourData[]>([]);
  const [officeData, setOfficeData] = useState<OfficeData[]>([]);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isProcessing = useRef(false);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  // ─── Card reveal helpers ──────────────────────────────────────────────────

  const showCard = useCallback((card: CardType, delay: number) => {
    setTimeout(() => {
      setVisibleCards((prev) => new Set([...prev, card]));
      scrollToBottom();
    }, delay);
  }, []);

  const advanceStep = (next: StepId) => {
    setCurrentStep(next);
  };

  // ─── Process conversation turns ──────────────────────────────────────────

  const processTurns = useCallback(async (turns: { role: 'user' | 'assistant'; content: string; agentId?: AgentId; delay?: number }[], scenario: ScenarioConfig | null) => {
    for (const turn of turns) {
      if (turn.role === 'assistant') {
        setThinkingAgent(getAgentLabel(turn.agentId ?? 'retrieval'));
        setThinking(true);
        scrollToBottom();
        await new Promise<void>((res) => setTimeout(res, turn.delay ?? 1500));
        setThinking(false);

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-${Math.random()}`,
            role: 'assistant',
            content: turn.content,
            agent: getAgentLabel(turn.agentId ?? 'retrieval'),
            agentId: turn.agentId,
            timestamp: Date.now(),
          },
        ]);
        scrollToBottom();
      }
    }

    // If scenario matched, start the card flow
    if (scenario) {
      advanceStep('documents');
      showCard('checklist', 600);
    }
  }, [showCard]);

  // ─── Handle document upload ──────────────────────────────────────────────

  const handleUpload = useCallback(() => {
    const checks = generateDocValidation();
    setDocChecks(checks);
    showCard('validator', 200);
    advanceStep('documents');
  }, [showCard]);

  // ─── Handle validation complete ──────────────────────────────────────────

  const handleValidationComplete = useCallback(() => {
    if (!activeScenario) return;

    const qData = generateQueueData();
    const oData = generateOffices(activeScenario.officeName, activeScenario.officeCity);
    setQueueData(qData);
    setOfficeData(oData);

    // Add queue agent message
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `Documents validated! Now analyzing real-time queue data for **${activeScenario.officeName}**. I'm checking crowd patterns across 3 nearby offices to find your best time slot.`,
        agent: '📊 Queue Intelligence Agent',
        agentId: 'queue',
        timestamp: Date.now(),
      },
    ]);

    advanceStep('queue');
    showCard('queue', 800);
    scrollToBottom();
  }, [activeScenario, showCard]);

  // ─── Handle slot booking ─────────────────────────────────────────────────

  const handleBook = useCallback(() => {
    if (!activeScenario) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `Great choice! I've locked in your slot. Here's your complete visit plan with step-by-step instructions, counter numbers, and timing. You can also send this to WhatsApp for a reminder.`,
        agent: '📋 Workflow Agent',
        agentId: 'workflow',
        timestamp: Date.now(),
      },
    ]);

    advanceStep('plan');
    showCard('workflow', 600);
    scrollToBottom();
  }, [activeScenario, showCard]);

  // ─── Handle WhatsApp send ────────────────────────────────────────────────

  const handleWhatsapp = useCallback(() => {
    advanceStep('notify');
    showCard('whatsapp', 400);
    scrollToBottom();
  }, [showCard]);

  // ─── Handle user message ────────────────────────────────────────────────

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isProcessing.current) return;
    setInput('');
    isProcessing.current = true;

    // Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    scrollToBottom();

    // Detect language
    const lang = detectLanguage(text);
    if (lang !== 'en') {
      setDetectedLang(`${getLanguageFlag(lang)} ${getLanguageLabel(lang)}`);
    }

    // Plan conversation
    const plan = planConversation(text);
    setActiveScenario(plan.scenario);

    // Process turns
    await processTurns(plan.turns, plan.scenario);

    isProcessing.current = false;
  }, [input, processTurns]);

  // ─── Load scenario from URL ──────────────────────────────────────────────

  useEffect(() => {
    const persona = searchParams.get('persona');
    if (persona) {
      const map: Record<string, string> = {
        'MSME Registration': 'msme',
        'Welfare Scheme (Marathi)': 'welfare',
        'Certificate — Urgent': 'certificate',
      };
      const key = map[persona];
      if (key) {
        const scenario = SCENARIOS.find((s) => s.key === key);
        if (scenario) {
          setTimeout(() => {
            const userText = scenario.key === 'welfare'
              ? 'मला PM Awas Yojana साठी नोंदणी करायची आहे'
              : scenario.key === 'msme'
              ? 'I want to register my shop under MSME Udyam'
              : 'I urgently need domicile and caste certificate';
            setInput(userText);
            setTimeout(() => {
              const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
              if (inputEl) {
                // Simulate pressing enter
                setMessages([{
                  id: `msg-${Date.now()}`,
                  role: 'user',
                  content: userText,
                  timestamp: Date.now(),
                }]);
                const lang = detectLanguage(userText);
                if (lang !== 'en') setDetectedLang(`${getLanguageFlag(lang)} ${getLanguageLabel(lang)}`);
                const plan = planConversation(userText);
                setActiveScenario(plan.scenario);
                processTurns(plan.turns, plan.scenario);
              }
            }, 300);
          }, 500);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Scenario chip click ────────────────────────────────────────────────

  const loadScenario = useCallback(async (key: string) => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    // Reset state
    setMessages([]);
    setVisibleCards(new Set());
    setCurrentStep('understand');
    setDetectedLang(null);
    setActiveScenario(null);
    setDocChecks([]);
    setQueueData([]);
    setOfficeData([]);

    const scenario = SCENARIOS.find((s) => s.key === key);
    if (!scenario) { isProcessing.current = false; return; }

    const userText = key === 'welfare'
      ? 'मला PM Awas Yojana साठी नोंदणी करायची आहे'
      : key === 'msme'
      ? 'I want to register my shop under MSME Udyam'
      : key === 'driving-license'
      ? 'I need to renew my driving license at the RTO'
      : key === 'pan'
      ? 'I need to correct my name on my PAN card'
      : 'I urgently need domicile and caste certificate';

    const lang = detectLanguage(userText);
    if (lang !== 'en') setDetectedLang(`${getLanguageFlag(lang)} ${getLanguageLabel(lang)}`);

    setMessages([{
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    }]);

    const plan = planConversation(userText);
    setActiveScenario(plan.scenario);
    await processTurns(plan.turns, plan.scenario);
    isProcessing.current = false;
  }, [processTurns]);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
      <ProgressTracker currentStep={currentStep} />

      <div className="flex-1 flex flex-col lg:flex-row max-w-5xl mx-auto w-full px-4 py-4 gap-4">
        {/* Scenario Chips */}
        <div className="lg:w-48 flex lg:flex-col gap-2 flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:block mb-1">
            Try a scenario
          </p>
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => loadScenario(s.key)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-[#0F2A5E] hover:text-[#0F2A5E] hover:bg-blue-50 hover:shadow-sm transition-all text-left"
            >
              <span>{s.icon}</span>
              <span className="text-xs font-medium leading-tight">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Column */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Chat Window */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0F2A5E]" />
                <span className="text-sm font-semibold text-[#0F2A5E]">QueueLess AI Assistant</span>
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              </div>
              {detectedLang && (
                <span className="text-xs bg-blue-50 text-[#0F2A5E] px-3 py-1 rounded-full font-medium border border-blue-100">
                  {detectedLang}
                </span>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-64 max-h-80 scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#0F2A5E]" />
                  </div>
                  <p className="text-gray-400 text-sm max-w-xs">{INITIAL_GREETING}</p>
                </div>
              )}

              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} showLang />
              ))}

              {thinking && <TypingIndicator agent={thinkingAgent} />}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Type your government task or question..."
                  className="flex-1 px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2A5E]/20 focus:border-[#0F2A5E] transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || thinking}
                  className="p-2.5 bg-[#0F2A5E] text-white rounded-xl disabled:opacity-40 hover:bg-[#1a3a7a] transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="space-y-4">
            {visibleCards.has('checklist') && activeScenario && (
              <div className="animate-fade-up">
                <DocumentChecklist
                  title={activeScenario.documentTitle}
                  documents={activeScenario.documents}
                  visible={visibleCards.has('checklist')}
                  onUpload={handleUpload}
                />
              </div>
            )}

            {visibleCards.has('validator') && docChecks.length > 0 && (
              <div className="animate-fade-up">
                <DocumentValidator
                  checks={docChecks}
                  visible={visibleCards.has('validator')}
                  onComplete={handleValidationComplete}
                />
              </div>
            )}

            {visibleCards.has('queue') && activeScenario && queueData.length > 0 && (
              <div className="animate-fade-up">
                <QueueChart
                  data={queueData}
                  offices={officeData}
                  officeName={activeScenario.officeName}
                  city={activeScenario.officeCity}
                  visible={visibleCards.has('queue')}
                  onBook={handleBook}
                />
              </div>
            )}

            {visibleCards.has('workflow') && activeScenario && (
              <div className="animate-fade-up">
                <WorkflowPlan
                  steps={activeScenario.totalSteps}
                  officeName={activeScenario.officeName}
                  city={activeScenario.officeCity}
                  feeAmount={activeScenario.feeAmount}
                  visible={visibleCards.has('workflow')}
                  onSendWhatsapp={handleWhatsapp}
                />
              </div>
            )}

            {visibleCards.has('whatsapp') && activeScenario && (
              <div className="animate-fade-up">
                <WhatsAppCard
                  scenario={activeScenario}
                  visible={visibleCards.has('whatsapp')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
