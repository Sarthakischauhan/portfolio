import localFont from "next/font/local";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import "@sarchauhan/code-markdown/styles.css";
import Head from "next/head";
import { Navbar } from "./components";
import { siteDescription, siteName, siteTitle, siteUrl } from "./lib/site";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource/inter/files/inter-latin-200-normal.woff2", weight: "200", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});
const ibmPlexMono = localFont({
  variable: "--font-ibm-mono",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-100-normal.woff2", weight: "100", style: "normal" },
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  keywords: [
    "Sarthak Chauhan",
    "software engineer",
    "web interfaces",
    "agents",
    "microservices",
    "Tesla",
    "Bay Area",
    "SJSU",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle.default,
    description: siteDescription,
    images: [
      {
        url: "/D.png",
        width: 512,
        height: 512,
        alt: "Sarthak Chauhan",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@sarchauhann",
    creator: "@sarchauhann",
    title: siteTitle.default,
    description: siteDescription,
    images: ["/D.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  image: `${siteUrl}/D.png`,
  jobTitle: "Software Engineer",
  email: "mailto:sarthakchauhann@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressLocality: "Bay Area",
    addressCountry: "US",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "San Jose State University",
  },
  sameAs: [
    "https://github.com/Sarthakischauhan",
    "https://www.linkedin.com/in/sarthakchauhan01/",
    "https://x.com/sarchauhann",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="date=no" />
      </Head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${GeistSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
