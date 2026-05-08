import type { Language } from './types';
import { LANG_KEYWORDS } from './mock-data';

export function detectLanguage(text: string): Language {
  // Check regional scripts first (more specific)
  if (LANG_KEYWORDS.ta.test(text)) return 'ta';
  if (LANG_KEYWORDS.kn.test(text)) return 'kn';
  // Marathi uses Devanagari but has specific words
  if (LANG_KEYWORDS.mr.test(text)) return 'mr';
  if (LANG_KEYWORDS.hi.test(text)) return 'hi';
  return 'en';
}

export function getLanguageLabel(lang: Language): string {
  const labels: Record<Language, string> = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi',
    kn: 'Kannada',
    ta: 'Tamil',
  };
  return labels[lang];
}

export function getLanguageFlag(lang: Language): string {
  return lang === 'en' ? '🇬🇧' : '🇮🇳';
}
