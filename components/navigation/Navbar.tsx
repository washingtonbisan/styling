"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cs";
import { MobileMenu } from "./MobileMenu";

// 1. Import Font Awesome components and the specific Spotify icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const navLinks = [
  { label: "Premium", href: "/premium" },
  { label: "Support", href: "/support" },
  { label: "Download", href: "/download" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-spotify-black/90 backdrop-blur-md border-b border-spotify-gray-700">
        <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-spotify-green transition-colors"
          >
            {/* FontAwesomeIcon */}
            <FontAwesomeIcon
              icon={faSpotify}
              className="w-9 h-9 text-spotify-green"
            />
            <span className="font-display font-bold text-xl hidden sm:block">
              Spotify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-spotify-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signup"
              className="text-sm font-semibold text-spotify-gray-300 hover:text-white transition-colors"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="bg-white text-spotify-black px-6 py-2 rounded-pill text-sm font-bold hover:scale-[1.04] transition-transform"
            >
              Log in
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-white hover:text-spotify-green transition-colors"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
