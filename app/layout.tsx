import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppStateProvider, themeBootScript } from "@/components/AppState";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "Optimised Windows",
    template: "%s · Windows Optimise",
  },
  description:
    "Simple, reversible Windows 11 settings that make your PC feel faster. No scripts, no registry hacks, no third-party tools.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f3f3" },
    { media: "(prefers-color-scheme: dark)", color: "#202020" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <AppStateProvider>
          <AppShell>{children}</AppShell>
        </AppStateProvider>
      </body>
    </html>
  );
}
