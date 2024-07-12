import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
// TODO: pick site font
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { clerkAppearance } from "@/styles/clerk-appearance";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  applicationName: "Jeopardy",
  keywords: [
    "jeopardy",
    "board game",
    "play jeopardy",
    "game",
    "sandbox jeopardy",
  ],
  title: {
    template: "%s | Jeopardy",
    default: "Jeopardy",
  },
  description: "Make jeopardy boards and play them.",
  icons: {
    icon: [{ url: "/favicon/favicon.ico" }],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
    other: [
      {
        rel: "icon",
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      <body className="bg-base text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider appearance={clerkAppearance}>
            <div
              className="grid min-h-screen grid-rows-[minmax(5vh,auto)_1fr]"
              style={{ minHeight: "100dvh" }}
            >
              <SiteHeader />
              <TRPCReactProvider>{children}</TRPCReactProvider>
              <Toaster position="top-right" closeButton richColors />
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
