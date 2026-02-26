import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReducedMotionProvider } from "@/components/ui/ReducedMotionProvider";
// import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Digital Couture Studio",
  description: "Spotify-caliber design system with Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark">
          <ReducedMotionProvider>{children}</ReducedMotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
