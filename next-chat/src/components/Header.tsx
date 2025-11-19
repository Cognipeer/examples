'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

interface HeaderProps {
  showMobileSidebar?: boolean;
  onToggleSidebar?: () => void;
  showSidebarButton?: boolean;
}

export default function Header({ 
  showMobileSidebar = false, 
  onToggleSidebar, 
  showSidebarButton = false 
}: HeaderProps) {
  return (
    <header className="bg-white border-b-1 border-gray-300 p-4 flex items-center justify-between">
      <Link href="/" className="pointer-events-auto select-none inline-block">
        <Image 
          src="/cognipeer-logo-d-beta.png" 
          width={189} 
          height={42} 
          alt="cognipeer-logo" 
        />
      </Link>

      {showSidebarButton && onToggleSidebar && (
        <button 
          className="md:hidden text-teal-600 p-2" 
          onClick={onToggleSidebar} 
          aria-label="Toggle sidebar"
        >
          {showMobileSidebar ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}
    </header>
  );
}
