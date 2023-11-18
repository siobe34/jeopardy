import "@/styles/globals.css";

import { Alegreya_Sans } from "next/font/google";
import { cookies } from "next/headers";

import { Header } from "@/app/_components/header";
import { Toaster } from "@/app/_components/ui/toaster";
import { cn } from "@/lib/cn";
import { TRPCReactProvider } from "@/trpc/react";

const font = Alegreya_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Jeopardy",
  description: "Make custom jeopardy games to play! :)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`font-sans ${font.variable}`}>
      <body>
        <div
          className={cn(
            "_app grid min-h-screen grid-cols-1 grid-rows-[12rem_1fr]",
            "min-h-[100dvh]",
          )}
        >
          <Header />
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
