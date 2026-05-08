import { Link } from 'react-router-dom';
import {
  FileCheck,
  Clock,
  Map,
  Bell,
  ArrowRight,
  CheckCircle,
  TrendingDown,
  Users,
  Globe,
  Zap,
} from 'lucide-react';

const personas = [
  {
    name: 'Ravi',
    role: 'Shop Owner',
    task: 'Register my business under MSME',
    avatar: 'R',
    color: 'bg-blue-100 text-blue-700',
    borderColor: 'hover:border-blue-200',
    tag: 'MSME Registration',
    scenario: 'msme',
  },
  {
    name: 'Meena',
    role: 'Rural Citizen',
    task: 'Enrol in PM Awas Yojana welfare scheme',
    avatar: 'M',
    color: 'bg-green-100 text-green-700',
    borderColor: 'hover:border-green-200',
    tag: 'Welfare Scheme (Marathi)',
    scenario: 'welfare',
  },
  {
    name: 'Priya',
    role: 'Student',
    task: 'Get domicile + caste certificate urgently',
    avatar: 'P',
    color: 'bg-amber-100 text-amber-700',
    borderColor: 'hover:border-amber-200',
    tag: 'Certificate — Urgent',
    scenario: 'certificate',
  },
];

const features = [
  {
    icon: FileCheck,
    title: 'Document Validation',
    desc: 'Upload once. Know before you go.',
    detail: 'AI checks blur, expiry, format, name mismatch — before you stand in line.',
    color: 'text-[#0F2A5E]',
    bg: 'bg-blue-50',
  },
  {
    icon: Clock,
    title: 'Queue Prediction',
    desc: 'Best time to visit, not the worst.',
    detail: 'Live crowd data and historical patterns predict the quietest windows.',
    color: 'text-[#22C55E]',
    bg: 'bg-green-50',
  },
  {
    icon: Map,
    title: 'Step-by-Step Plan',
    desc: 'Counter numbers, fees, what to say.',
    detail: 'From parking to payment — every step mapped for your specific task.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Bell,
    title: 'WhatsApp Alerts',
    desc: 'Reminders sent. No app needed.',
    detail: 'Get notified 1 hour before your slot. In your language.',
    color: 'text-[#0F2A5E]',
    bg: 'bg-blue-50',
  },
];

const metrics = [
  { value: '61%', label: 'Fewer office visits', icon: TrendingDown },
  { value: '80%', label: 'Shorter wait times', icon: Clock },
  { value: '94%', label: 'Document accuracy', icon: CheckCircle },
  { value: '5', label: 'Languages supported', icon: Globe },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-20 px-4 bg-gradient-to-br from-[#0F2A5E] via-[#1a3a7a] to-[#0F2A5E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#22C55E] rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            Powered by multi-agent AI · Deployed for Bharat
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Skip the queue.
            <br />
            <span className="text-[#22C55E]">Not the service.</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI agents that plan your government office visit — document check, queue prediction,
            WhatsApp reminders. In your language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 bg-[#22C55E] text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-900/30 text-base hover:shadow-xl hover:-translate-y-0.5"
            >
              Try the AI Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/metrics"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20 text-base backdrop-blur-sm"
            >
              See Impact Data
            </Link>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#22C55E] uppercase tracking-wider mb-2">
              Real Citizens. Real Tasks.
            </p>
            <h2 className="text-3xl font-bold text-[#0F2A5E]">
              Who uses QueueLess AI?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Click a persona to start a guided demo experience tailored to their situation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {personas.map((p) => (
              <Link
                key={p.name}
                to={`/chat?persona=${encodeURIComponent(p.tag)}`}
                className={`group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md ${p.borderColor} transition-all cursor-pointer hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${p.color}`}>
                    {p.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  "{p.task}"
                </p>
                <div className="flex items-center gap-1 text-[#0F2A5E] text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Try this scenario</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#22C55E] uppercase tracking-wider mb-2">
              How It Works
            </p>
            <h2 className="text-3xl font-bold text-[#0F2A5E]">
              Every step, handled.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, desc, detail, color, bg }) => (
              <div
                key={title}
                className="flex gap-5 p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-1">{desc}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Bar */}
      <section className="py-14 px-4 bg-[#0F2A5E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#22C55E] rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {metrics.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-5 h-5 text-[#22C55E]" />
                <span className="text-3xl font-extrabold text-white">{value}</span>
                <span className="text-sm text-blue-200 leading-tight">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-blue-200 text-sm">
              61% fewer office visits · 80% shorter wait times ·
              94% document accuracy · 5 languages supported
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#22C55E]" />
            <span className="text-sm font-medium text-gray-600">Trusted by early adopters across Maharashtra, UP, Tamil Nadu</span>
          </div>
          <h2 className="text-3xl font-bold text-[#0F2A5E] mb-4">
            Ready to reclaim your day?
          </h2>
          <p className="text-gray-500 mb-8">
            No login. No app download. Just tell the AI what you need to do.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 bg-[#0F2A5E] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1a3a7a] transition-all shadow-md text-base hover:shadow-lg hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4" />
            Start Your Visit Plan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0F2A5E] rounded flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-[#0F2A5E]">QueueLess AI</span>
            <span className="text-gray-400">·</span>
            <span>Built for India's 1.4 billion</span>
          </div>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-[#0F2A5E] transition-colors">About</Link>
            <Link to="/metrics" className="hover:text-[#0F2A5E] transition-colors">Impact</Link>
            <Link to="/chat" className="hover:text-[#0F2A5E] transition-colors">Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
