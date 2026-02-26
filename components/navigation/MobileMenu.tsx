"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cs";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Close on ESC key press — accessibility requirement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-72 bg-spotify-black flex flex-col",
          "transition-transform duration-300 ease-out md:hidden",
          "shadow-modal",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-spotify-gray-700">
          <span className="font-display font-bold text-white text-lg">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 text-spotify-gray-300 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col p-4 gap-2 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="px-4 py-3 text-base font-semibold text-spotify-gray-300 hover:text-white hover:bg-spotify-gray-700 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Auth Actions */}
        <div className="p-4 border-t border-spotify-gray-700 flex flex-col gap-3">
          <Link
            href="/signup"
            onClick={onClose}
            className="w-full py-3 text-center text-sm font-bold border border-spotify-gray-300 text-white rounded-pill hover:border-white transition-colors"
          >
            Sign up free
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="w-full py-3 text-center text-sm font-bold bg-white text-spotify-black rounded-pill hover:scale-[1.02] transition-transform"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
