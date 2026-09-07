import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wrench } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Brands', href: '/#brands' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Cabuyao <span className="text-blue-600">Tek</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            <a
              href="/track"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              Track Repair
            </a>
            <a
              href="/request"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-blue-600 text-white px-3 py-3 rounded-lg text-base font-semibold hover:bg-blue-700"
            >
              Request a Repair
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
