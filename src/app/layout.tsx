import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import NextTopLoader from 'nextjs-toploader';
import { QueryProvider } from "@/components/auth/query-provider";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Cosmetia - Marketplace B2B pour l'industrie cosmétique",
  description: "Connectez-vous avec les meilleurs fournisseurs d'ingrédients cosmétiques. Sourcez intelligemment avec l'aide de notre IA spécialisée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <NextTopLoader
          showSpinner={false}
          shadow={false}
          color="var(--primary)"
        />
        <QueryProvider>
          {children}
        </QueryProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
