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
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google AdSense: uncomment and add your pub ID when ready */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body className="min-h-screen bg-[#0D0D0F] font-sans text-[#F5F5F5] antialiased">
        <Header />
        <main className="min-h-[calc(100vh-120px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
