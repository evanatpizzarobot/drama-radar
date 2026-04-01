import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DramaRadar | Reality TV & Celebrity Gossip",
  description:
    "Your real-time scanner for reality TV news, celebrity gossip, and Bravo drama. Always scanning for the latest stories from your favorite shows.",
  metadataBase: new URL("https://dramaradar.com"),
  openGraph: {
    title: "DramaRadar | Reality TV & Celebrity Gossip",
    description:
      "Your real-time scanner for reality TV news, celebrity gossip, and Bravo drama. Always scanning for the latest stories from your favorite shows.",
    url: "https://dramaradar.com",
    siteName: "DramaRadar",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "DramaRadar: Reality TV and celebrity gossip news aggregator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DramaRadar | Reality TV & Celebrity Gossip",
    description:
      "Your real-time scanner for reality TV news, celebrity gossip, and Bravo drama.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Anti-flash: set theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("dramaradar-theme");if(!t){t=window.matchMedia("(prefers-color-scheme:light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`,
          }}
        />
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-7224757913262984" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7224757913262984"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-dr-bg font-sans text-dr-text antialiased">
        <Header />
        <main className="min-h-[calc(100vh-120px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
