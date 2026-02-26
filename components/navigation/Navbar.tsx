// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { cn } from "@/lib/cs";
// import { MobileMenu } from "./MobileMenu";


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpotify } from "@fortawesome/free-brands-svg-icons";

// const navLinks = [
//   { label: "Premium", href: "/premium" },
//   { label: "Support", href: "/support" },
//   { label: "Download", href: "/download" },
// ];

// export function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50 bg-spotify-black/90 backdrop-blur-md border-b border-spotify-gray-700">
//         <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 text-white hover:text-spotify-green transition-colors"
//           >
//             {/* FontAwesomeIcon */}
//             <FontAwesomeIcon
//               icon={faSpotify}
//               className="w-9 h-9 text-spotify-green"
//             />
//             <span className="font-display font-bold text-xl hidden sm:block">
//               Spotify
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm font-semibold text-spotify-gray-300 hover:text-white transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link
//               href="/signup"
//               className="text-sm font-semibold text-spotify-gray-300 hover:text-white transition-colors"
//             >
//               Sign up
//             </Link>
//             <Link
//               href="/login"
//               className="bg-white text-spotify-black px-6 py-2 rounded-pill text-sm font-bold hover:scale-[1.04] transition-transform"
//             >
//               Log in
//             </Link>
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             onClick={() => setIsMobileMenuOpen(true)}
//             className="md:hidden p-2 text-white hover:text-spotify-green transition-colors"
//             aria-label="Open menu"
//             aria-expanded={isMobileMenuOpen}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </nav>
//       </header>

//       <MobileMenu
//         isOpen={isMobileMenuOpen}
//         onClose={() => setIsMobileMenuOpen(false)}
//         links={navLinks}
//       />
//     </>
//   );
// }




"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Premium", href: "/premium" },
  { label: "Support", href: "/support" },
  { label: "Download", href: "/download" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--surface-elevated)]/90 backdrop-blur-md border-b border-[var(--border-default)]">
        <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {/* Spotify wordmark in green — simpler and more reliable than inline SVG path */}
            <div className="flex items-center gap-2">
              {/* Circle icon */}
              <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115.294.18.387.565.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.793c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 01-.955 1.612z" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-[var(--text-primary)] hidden sm:block">
                Spotify
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side: Theme Toggle + Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* THIS is where ThemeToggle lives — right in the navbar */}
            <ThemeToggle showLabel />

            <Link
              href="/signup"
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="bg-[var(--text-primary)] text-[var(--text-inverse)] px-6 py-2 rounded-full text-sm font-bold hover:scale-[1.04] transition-transform"
            >
              Log in
            </Link>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
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
          </div>
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