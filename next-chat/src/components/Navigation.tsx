'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiMessageSquare, 
  FiCode, 
  FiMaximize2,
  FiGlobe,
  FiHome
} from 'react-icons/fi';

const navigation = [
  { name: 'Home', href: '/', icon: FiHome },
  { name: 'Basic Chat', href: '/basic-chat', icon: FiMessageSquare },
  { name: 'Client Tools', href: '/client-tools', icon: FiCode },
  { name: 'Webchat Widget', href: '/webchat-widget', icon: FiMaximize2 },
  { name: 'Webchat URL', href: '/webchat-url', icon: FiGlobe },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
