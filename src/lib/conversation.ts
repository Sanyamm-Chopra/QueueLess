import type { AgentId, Language, ScenarioConfig } from './types';
import { SCENARIOS, AGENT_LABELS, FALLBACK_RESPONSES, TRANSLATED_RESPONSES } from './mock-data';
import { detectLanguage } from './language';

export interface ConversationTurn {
  role: 'user' | 'assistant';
  content: string;
  agentId?: AgentId;
  delay?: number;
}

export interface ConversationPlan {
  scenario: ScenarioConfig | null;
  turns: ConversationTurn[];
  detectedLang: Language;
}

export function matchScenario(text: string): ScenarioConfig | null {
  const lower = text.toLowerCase();
  let bestMatch: ScenarioConfig | null = null;
  let bestScore = 0;

  for (const scenario of SCENARIOS) {
    let score = 0;
    for (const kw of scenario.intentKeywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.length; // longer keyword matches are stronger
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = scenario;
    }
  }

  return bestScore >= 3 ? bestMatch : null;
}

export function planConversation(userText: string): ConversationPlan {
  const lang = detectLanguage(userText);
  const scenario = matchScenario(userText);

  if (!scenario) {
    const fallbackIdx = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
    const turns: ConversationTurn[] = [
      { role: 'assistant', content: FALLBACK_RESPONSES[fallbackIdx], agentId: 'retrieval', delay: 1200 },
    ];

    if (lang !== 'en' && TRANSLATED_RESPONSES[lang]?.length > 0) {
      const translatedIdx = Math.floor(Math.random() * TRANSLATED_RESPONSES[lang].length);
      turns.push({
        role: 'assistant',
        content: TRANSLATED_RESPONSES[lang][translatedIdx],
        agentId: 'retrieval',
        delay: 800,
      });
    }

    return { scenario: null, turns, detectedLang: lang };
  }

  const turns: ConversationTurn[] = [];

  // Turn 1: Retrieval agent acknowledges
  if (lang !== 'en') {
    const nativeResponse = lang === 'hi'
      ? `मैंने आपकी ज़रूरत समझ ली है। ${scenario.label} के लिए मैं दस्तावेज़ और प्रक्रिया तैयार कर रहा हूँ।`
      : lang === 'mr'
      ? `मी तुमची गरज समजली. ${scenario.label} साठी मी कागदपत्रे आणि प्रक्रिया तयार करत आहे.`
      : `I understand your need. Let me prepare the documents and process for ${scenario.label}.`;
    turns.push({
      role: 'assistant',
      content: nativeResponse,
      agentId: 'retrieval',
      delay: 1400,
    });
  } else {
    turns.push({
      role: 'assistant',
      content: `Got it — you need help with **${scenario.label}**. Let me pull up the latest requirements and process details.`,
      agentId: 'retrieval',
      delay: 1400,
    });
  }

  // Turn 2: Workflow agent provides document context
  turns.push({
    role: 'assistant',
    content: `I've found the document checklist for ${scenario.label}. This is handled at **${scenario.officeName}, ${scenario.officeCity}**. The fee is ${scenario.feeAmount}. Let me show you exactly what to bring.`,
    agentId: 'workflow',
    delay: 1800,
  });

  // Turn 3: Document agent ready to validate
  turns.push({
    role: 'assistant',
    content: `Here's your document checklist. Tick off what you already have, then upload for AI validation. I'll check image quality, expiry dates, name matches, and format compliance.`,
    agentId: 'document',
    delay: 1200,
  });

  return { scenario, turns, detectedLang: lang };
}

export function getAgentLabel(agentId: AgentId): string {
  return AGENT_LABELS[agentId] || '🤖 AI Agent';
}
