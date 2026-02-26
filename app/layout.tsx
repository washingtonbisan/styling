// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@/context/ThemeContext";
// import { ReducedMotionProvider } from "@/components/ui/ReducedMotionProvider";
// // import { ThemeProvider } from "@/contexts/ThemeContext";

// export const metadata: Metadata = {
//   title: "Digital Couture Studio",
//   description: "Spotify-caliber design system with Tailwind CSS",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className="antialiased">
//         <ThemeProvider defaultTheme="dark">
//           <ReducedMotionProvider>{children}</ReducedMotionProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReducedMotionProvider } from "@/components/ui/ReducedMotionProvider";

export const metadata: Metadata = {
  title: "Digital Couture Studio",
  description: "Spotify-caliber design system with Tailwind CSS",
};

// This script runs SYNCHRONOUSLY before the browser paints anything.
// It reads localStorage and applies the theme class to <html> immediately,
// so there is zero flash between server render and client hydration.
const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('spotify-ds-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.remove('dark', 'light', 'high-contrast');
      document.documentElement.classList.add(theme);
    } catch(e) {
      // If localStorage is blocked (private browsing etc), default to dark
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark">
          <ReducedMotionProvider>{children}</ReducedMotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}