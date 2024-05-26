import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";

// TODO: add metadata titles to all pages, favicon, site fonts, etc.
export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${GeistSans.variable}`}
      >
        <body
          className="grid min-h-screen grid-rows-[minmax(5vh,auto)_1fr]"
          style={{ minHeight: "100dvh" }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster position="top-right" closeButton richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
