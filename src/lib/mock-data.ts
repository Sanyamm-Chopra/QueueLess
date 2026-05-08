import type {
  ScenarioConfig,
  DocCheckItem,
  QueueHourData,
  OfficeData,
  Language,
  StepId,
} from './types';

// ─── Scenarios ────────────────────────────────────────────────────────────────

export const SCENARIOS: ScenarioConfig[] = [
  {
    key: 'driving-license',
    label: 'Driving License Renewal',
    icon: '🚗',
    intentKeywords: ['driving', 'license', 'dl', 'rto', 'renew', 'renewal', 'car', 'motor'],
    documentTitle: 'Documents required for Driving License Renewal',
    documents: [
      'Aadhaar Card',
      'Existing Driving License',
      'Passport-size Photo (recent)',
      'Form 1A — Self Declaration',
      'Fee Receipt (₹200)',
    ],
    officeName: 'Andheri RTO',
    officeCity: 'Mumbai',
    feeAmount: '₹200',
    formName: 'Form 1A',
    formLink: 'parivahan.gov.in/form1a',
    totalSteps: [
      { n: 1, text: 'Fill Form 1A online tonight (15 min)', detail: 'Link: parivahan.gov.in/form1a', time: 'Tonight' },
      { n: 2, text: 'Arrive at Andheri RTO, Gate 2 entrance', detail: '8:00 AM sharp', time: '8:00 AM' },
      { n: 3, text: 'Token counter — Ground floor, Counter 3–7', detail: 'Collect your token number', time: '8:05 AM' },
      { n: 4, text: 'Pay ₹200 fee at cashier', detail: 'Counter 12, cash or UPI accepted', time: '8:20 AM' },
      { n: 5, text: 'Biometric scan — Upper floor, Room 104', detail: 'Fingerprint + photo capture', time: '8:35 AM' },
      { n: 6, text: 'Collect receipt', detail: 'Expect SMS confirmation in 2 days', time: '8:55 AM' },
    ],
  },
  {
    key: 'msme',
    label: 'MSME Registration',
    icon: '🏪',
    intentKeywords: ['msme', 'udyam', 'business', 'shop', 'register', 'sme', 'small business', 'udyam'],
    documentTitle: 'Documents required for MSME Udyam Registration',
    documents: [
      'Aadhaar Card of proprietor',
      'PAN Card',
      'GST Registration (if applicable)',
      'Bank statement (last 6 months)',
      'Business address proof',
    ],
    officeName: 'DIC Office',
    officeCity: 'Pune',
    feeAmount: 'Free',
    formName: 'Udyam Registration',
    formLink: 'udyamregistration.gov.in',
    totalSteps: [
      { n: 1, text: 'Complete Udyam Registration online', detail: 'Link: udyamregistration.gov.in', time: 'Tonight' },
      { n: 2, text: 'Visit DIC Office for verification', detail: '9:00 AM, Room 203', time: '9:00 AM' },
      { n: 3, text: 'Submit printed application at Counter 2', detail: 'Bring all original documents', time: '9:15 AM' },
      { n: 4, text: 'Biometric verification', detail: 'Room 105, Ground floor', time: '9:30 AM' },
      { n: 5, text: 'Collect Udyam Certificate', detail: 'Available same day if all docs correct', time: '10:00 AM' },
    ],
  },
  {
    key: 'welfare',
    label: 'Welfare Scheme (Marathi)',
    icon: '🏠',
    intentKeywords: ['pm awas', 'welfare', 'scheme', 'yojana', 'ration', 'bpl', 'subsidy', 'housing', 'awas'],
    documentTitle: 'PM Awas Yojana साठी आवश्यक कागदपत्रे',
    documents: [
      'Aadhaar Card (all family members)',
      'Ration Card',
      'Income Certificate',
      'Caste Certificate (if applicable)',
      'Land/Property documents',
      'Bank Passbook (for DBT)',
    ],
    officeName: 'Gram Panchayat Office',
    officeCity: 'Nagpur',
    feeAmount: 'Free',
    formName: 'PMAY Application',
    formLink: 'pmaymis.gov.in',
    totalSteps: [
      { n: 1, text: 'Fill PMAY application online', detail: 'Link: pmaymis.gov.in', time: 'Tonight' },
      { n: 2, text: 'Visit Gram Panchayat with originals', detail: '9:00 AM, Main office', time: '9:00 AM' },
      { n: 3, text: 'Submit at Welfare Counter', detail: 'Counter 1, Ground floor', time: '9:15 AM' },
      { n: 4, text: 'Income verification by Talathi', detail: 'Same building, Room 4', time: '9:45 AM' },
      { n: 5, text: 'Collect acknowledgment receipt', detail: 'Track status via SMS', time: '10:15 AM' },
    ],
  },
  {
    key: 'pan',
    label: 'PAN Correction',
    icon: '🪪',
    intentKeywords: ['pan', 'correction', 'pan card', 'update pan', 'aadhaar pan', 'nsdl', 'utiitsl'],
    documentTitle: 'Documents required for PAN Card Correction',
    documents: [
      'Existing PAN Card',
      'Aadhaar Card',
      'Proof of identity (Passport/Voter ID)',
      'Proof of address (Utility bill)',
      'Passport-size Photo',
      'Fee Receipt (₹107)',
    ],
    officeName: 'NSDL Facilitation Center',
    officeCity: 'Mumbai',
    feeAmount: '₹107',
    formName: 'PAN Correction Form',
    formLink: 'onlineservices.nsdl.com',
    totalSteps: [
      { n: 1, text: 'Fill PAN correction form online', detail: 'Link: onlineservices.nsdl.com', time: 'Tonight' },
      { n: 2, text: 'Visit NSDL Center with originals', detail: '10:00 AM, 3rd Floor', time: '10:00 AM' },
      { n: 3, text: 'Submit form + documents at Counter 4', detail: 'Biometric verification required', time: '10:15 AM' },
      { n: 4, text: 'Pay ₹107 processing fee', detail: 'Cash or card accepted', time: '10:30 AM' },
      { n: 5, text: 'Collect acknowledgment', detail: 'New PAN dispatched in 15 days', time: '10:45 AM' },
    ],
  },
  {
    key: 'certificate',
    label: 'Certificate — Urgent',
    icon: '📄',
    intentKeywords: ['certificate', 'domicile', 'caste', 'income', 'urgent', 'tehsildar', 'tehsil'],
    documentTitle: 'Documents required for Domicile + Caste Certificate',
    documents: [
      'Aadhaar Card',
      'Ration Card (3+ years)',
      'School Leaving Certificate',
      'Self-declaration affidavit',
      'Caste validity (if available)',
      'Fee Receipt (₹50)',
    ],
    officeName: 'Tehsildar Office',
    officeCity: 'Lucknow',
    feeAmount: '₹50',
    formName: 'Certificate Application',
    formLink: 'edistrict.up.gov.in',
    totalSteps: [
      { n: 1, text: 'Fill certificate application online', detail: 'Link: edistrict.up.gov.in', time: 'Tonight' },
      { n: 2, text: 'Visit Tehsildar Office, Gate 1', detail: '8:00 AM — arrive early for token', time: '8:00 AM' },
      { n: 3, text: 'Token counter — Ground floor', detail: 'Collect token, wait for number', time: '8:05 AM' },
      { n: 4, text: 'Submit at Verification Counter', detail: 'Counter 5, all originals needed', time: '8:30 AM' },
      { n: 5, text: 'Pay ₹50 fee', detail: 'Cashier, Room 12', time: '8:45 AM' },
      { n: 6, text: 'Collect certificate', detail: 'Tatkal: same day. Normal: 7 days', time: '9:30 AM' },
    ],
  },
];

// ─── Agent Labels ─────────────────────────────────────────────────────────────

export const AGENT_LABELS: Record<string, string> = {
  retrieval: '🔍 Retrieval Agent',
  workflow: '📋 Workflow Agent',
  document: '📑 Document Agent',
  queue: '📊 Queue Intelligence Agent',
};

// ─── Language Detection ───────────────────────────────────────────────────────

export const LANG_KEYWORDS: Record<Language, RegExp> = {
  en: /^[a-zA-Z0-9\s.,!?'"-]+$/,
  hi: /[\u0900-\u097F]/,
  mr: /[\u0900-\u097F].*(आहे|आहेत|करा|मला|तुम्ही|हवे|योजना)/,
  kn: /[\u0C80-\u0CFF]/,
  ta: /[\u0B80-\u0BFF]/,
};

export const LANG_NAMES: Record<Language, string> = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  kn: 'Kannada',
  ta: 'Tamil',
};

export const LANG_FLAGS: Record<Language, string> = {
  en: '🇬🇧',
  hi: '🇮🇳',
  mr: '🇮🇳',
  kn: '🇮🇳',
  ta: '🇮🇳',
};

// ─── Queue Data Generator ────────────────────────────────────────────────────

const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
const BASE_BUSYNESS = [20, 35, 85, 90, 80, 50, 45, 88, 92, 70, 30];

export function generateQueueData(): QueueHourData[] {
  const recommended = Math.floor(Math.random() * 3); // 0, 1, or 2
  return HOURS.map((hour, i) => {
    const jitter = Math.floor(Math.random() * 15) - 7;
    const busyness = Math.max(5, Math.min(100, BASE_BUSYNESS[i] + jitter));
    return {
      hour,
      busyness,
      isRecommended: i === recommended,
    };
  });
}

export function generateOffices(baseName: string, baseCity: string): OfficeData[] {
  const baseWait = 10 + Math.floor(Math.random() * 8);
  const baseDist = (1 + Math.random() * 0.5).toFixed(1);

  const alternatives = baseCity === 'Mumbai'
    ? ['Borivali RTO', 'Thane RTO']
    : baseCity === 'Pune'
    ? ['PCMC DIC Office', 'Hadapsar DIC']
    : baseCity === 'Nagpur'
    ? ['Dharampeth Office', 'Sitabuldi Center']
    : baseCity === 'Lucknow'
    ? ['Gomti Nagar Tehsil', 'Alambagh Tehsil']
    : ['Branch Office A', 'Branch Office B'];

  const offices: OfficeData[] = [
    {
      name: baseName,
      distance: `${baseDist}km`,
      wait: `${baseWait} min wait`,
      waitMin: baseWait,
      recommended: true,
      crowdLevel: baseWait < 15 ? 'low' : baseWait < 25 ? 'medium' : 'high',
    },
    {
      name: alternatives[0],
      distance: `${(3 + Math.random() * 3).toFixed(1)}km`,
      wait: `${baseWait + 8 + Math.floor(Math.random() * 6)} min wait`,
      waitMin: baseWait + 8 + Math.floor(Math.random() * 6),
      recommended: false,
      crowdLevel: 'medium',
    },
    {
      name: alternatives[1],
      distance: `${(7 + Math.random() * 5).toFixed(1)}km`,
      wait: `${baseWait + 18 + Math.floor(Math.random() * 8)} min wait`,
      waitMin: baseWait + 18 + Math.floor(Math.random() * 8),
      recommended: false,
      crowdLevel: 'high',
    },
  ];

  return offices;
}

// ─── Document Validation Generator ────────────────────────────────────────────

const DOC_ISSUES = [
  { label: 'Image quality', passResult: 'Clear', failResult: 'Blurry — re-upload', confidenceBase: 94 },
  { label: 'Expiry date', passResult: 'Valid until 2027', failResult: 'Expired — renew first', confidenceBase: 98 },
  { label: 'Aadhaar format', passResult: '12-digit confirmed', failResult: 'Invalid format', confidenceBase: 99 },
  { label: 'Name match', passResult: 'Name matches records', failResult: '"Ravi Kumar" vs "R. Kumar" — re-upload with full name', confidenceBase: 91 },
  { label: 'Photo readable', passResult: 'Yes', failResult: 'Too dark — retake photo', confidenceBase: 89 },
  { label: 'Signature present', passResult: 'Verified', failResult: 'Missing — sign and re-scan', confidenceBase: 87 },
];

export function generateDocValidation(): DocCheckItem[] {
  const failIndex = Math.floor(Math.random() * DOC_ISSUES.length);
  return DOC_ISSUES.map((item, i) => {
    const ok = i !== failIndex;
    const jitter = Math.floor(Math.random() * 5) - 2;
    return {
      label: item.label,
      result: ok ? item.passResult : item.failResult,
      ok,
      confidence: Math.max(70, Math.min(99, item.confidenceBase + jitter)),
    };
  });
}

// ─── Conversation Responses ──────────────────────────────────────────────────

export const INITIAL_GREETING = "Hello! I'm QueueLess AI — your government office assistant. Tell me what you need to do, and I'll plan your visit step by step. What government task do you need help with?";

export const FALLBACK_RESPONSES = [
  "I understand you need help with a government task. Let me look up the requirements for you.",
  "Got it — let me find the right process and documents for your case.",
  "I'll help you navigate this. Let me check the latest requirements and queue status.",
];

export const TRANSLATED_RESPONSES: Record<Language, string[]> = {
  en: [],
  hi: [
    'मैंने आपकी ज़रूरत समझ ली है। मैं दस्तावेज़ और प्रक्रिया की जाँच कर रहा हूँ।',
    'आपका काम जल्दी होगा। मुझे सही विभाग और काउंटर ढूँढने दें।',
  ],
  mr: [
    'मी तुमची गरज समजली. मी कागदपत्रे आणि प्रक्रिया तपासत आहे.',
    'तुमचे काम लवकर होईल. मला योग्य विभाग आणि काउंटर शोधू द्या.',
  ],
  kn: [
    'ನಿಮ್ಮ ಅವಶ್ಯಕತೆಯನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ. ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇನೆ.',
  ],
  ta: [
    'உங்கள் தேவையை நான் புரிந்துகொண்டேன். ஆவணங்களை சரிபார்க்கிறேன்.',
  ],
};

// ─── Steps ────────────────────────────────────────────────────────────────────

export const STEPS: { id: StepId; label: string }[] = [
  { id: 'understand', label: 'Understand' },
  { id: 'documents', label: 'Documents' },
  { id: 'queue', label: 'Queue' },
  { id: 'plan', label: 'Plan' },
  { id: 'notify', label: 'Notify' },
];
