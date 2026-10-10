import { Inter, IBM_Plex_Mono } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import "@sarchauhan/code-markdown/styles.css";
import Head from "next/head";
import { Navbar } from "./components";
import { siteDescription, siteName, siteTitle, siteUrl } from "./lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "200", "500"],
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["300", "100", "400"],
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
