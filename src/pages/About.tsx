import { Link } from 'react-router-dom';
import {
  Building2,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';

const problems = [
  {
    icon: Briefcase,
    title: 'SMB Funding',
    desc: 'Small business owners lose weeks navigating MSME registration, Udyam loans, and bank paperwork — often giving up before they qualify.',
    tag: 'Shop Owners · Artisans · Traders',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100 hover:border-blue-200',
  },
  {
    icon: Heart,
    title: 'Welfare Access',
    desc: 'Rural citizens miss out on PM Awas, ration card renewals, and social schemes because processes are opaque and forms change without notice.',
    tag: 'Rural Families · BPL Households',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100 hover:border-green-200',
  },
  {
    icon: UserCheck,
    title: 'Job Certificates',
    desc: 'Job seekers need experience certificates, NOCs, and police verifications — each from a different counter, on a different floor, on a different day.',
    tag: 'Job Seekers · Private Sector',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100 hover:border-amber-200',
  },
  {
    icon: GraduationCap,
    title: 'Education Docs',
    desc: 'Students applying for government seats race against time for domicile, caste, and income certificates — often missing deadlines due to queues.',
    tag: 'Students · College Applicants',
    color: 'text-[#0F2A5E]',
    bg: 'bg-blue-50',
    border: 'border-blue-100 hover:border-blue-200',
  },
  {
    icon: Users,
    title: 'Senior Citizens',
    desc: 'Elderly citizens navigating pension renewals, medical certificates, and Aadhaar updates face physical barriers, confusing counters, and no digital help.',
    tag: 'Seniors · Persons with Disability',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100 hover:border-rose-200',
  },
];

const team = [
  { initial: 'A', name: 'Arjun Sharma', role: 'Product & AI' },
  { initial: 'N', name: 'Nandini Rao', role: 'Design & UX' },
  { initial: 'K', name: 'Karthik Menon', role: 'Backend & Infra' },
  { initial: 'S', name: 'Shreya Patel', role: 'Field Research' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Mission */}
      <section className="bg-[#0F2A5E] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#22C55E] rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-[#22C55E]" />
            <span className="text-[#22C55E] text-sm font-semibold uppercase tracking-wider">Our Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            QueueLess AI was built for one reason:
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Ordinary citizens in India lose entire workdays to broken government processes.
          </p>
          <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
            <p className="text-blue-100 leading-relaxed">
              A shopkeeper in Pune takes 2 days off to register under MSME. A student in Lucknow misses her
              admission deadline because the Tehsildar's office sent her to the wrong counter — twice. A farmer
              in Vidarbha doesn't know he qualified for a welfare scheme because the notification was in English.
            </p>
            <p className="text-blue-100 leading-relaxed mt-4">
              These aren't edge cases. They're the norm for hundreds of millions of Indians. QueueLess AI
              uses multi-agent AI to give every citizen the same advantage a well-connected person has —
              the right information, the right documents, the right time.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Cards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#22C55E] uppercase tracking-wider mb-2">
              The Problem Space
            </p>
            <h2 className="text-3xl font-bold text-[#0F2A5E]">
              Five communities we serve
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Each category represents millions of Indians who interact with government systems
              regularly but have no digital help doing so.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map(({ icon: Icon, title, desc, tag, color, bg, border }) => (
              <div
                key={title}
                className={`bg-white rounded-xl p-6 border ${border} hover:shadow-md transition-all hover:-translate-y-0.5`}
              >
                <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{desc}</p>
                <span className={`text-xs font-semibold ${color} ${bg} px-2 py-1 rounded-full`}>{tag}</span>
              </div>
            ))}

            {/* CTA Card */}
            <div className="bg-[#0F2A5E] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <p className="text-white font-bold text-lg mb-2">Ready to try it?</p>
                <p className="text-blue-200 text-sm leading-relaxed">
                  No login. No app. Tell the AI your task and get a complete visit plan in 60 seconds.
                </p>
              </div>
              <Link
                to="/chat"
                className="mt-6 inline-flex items-center gap-2 bg-[#22C55E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-green-500 transition-all w-fit hover:shadow-lg"
              >
                Try the Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0F2A5E] mb-2">The Team</h2>
          <p className="text-gray-500 text-sm mb-10">
            A small group of engineers, designers, and field researchers — all from India.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((m) => (
              <div key={m.name} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-[#0F2A5E] text-white flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  {m.initial}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2A5E] py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-bold">QueueLess AI</span>
            <span className="text-blue-400">·</span>
            <span className="text-blue-300 text-sm">Built for India's 1.4 billion</span>
          </div>
          <div className="flex gap-6 text-sm text-blue-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/chat" className="hover:text-white transition-colors">Demo</Link>
            <Link to="/metrics" className="hover:text-white transition-colors">Metrics</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
