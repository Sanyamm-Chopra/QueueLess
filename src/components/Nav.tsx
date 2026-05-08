import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/chat', label: 'Demo' },
    { to: '/metrics', label: 'Metrics' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#0F2A5E] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#0F2A5E] text-lg tracking-tight">
              QueueLess <span className="text-[#22C55E]">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'text-[#0F2A5E] bg-blue-50'
                    : 'text-gray-600 hover:text-[#0F2A5E] hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/chat"
              className="ml-3 px-5 py-2 bg-[#0F2A5E] text-white text-sm font-semibold rounded-full hover:bg-[#1a3a7a] transition-all shadow-sm hover:shadow-md"
            >
              Try Demo →
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-3 rounded-lg text-sm font-medium mt-1 transition-colors ${
                isActive(to)
                  ? 'text-[#0F2A5E] bg-blue-50'
                  : 'text-gray-600 hover:text-[#0F2A5E] hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/chat"
            className="block mt-3 px-5 py-3 bg-[#0F2A5E] text-white text-sm font-semibold rounded-full text-center hover:bg-[#1a3a7a] transition-colors"
          >
            Try Demo →
          </Link>
        </div>
      </div>
    </nav>
  );
}
