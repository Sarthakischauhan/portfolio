import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Head from "next/head";

const inter = Inter({ variable:'--font-inter', subsets: ["latin"], weight:['400', '200', '500']});
const ibmPlexMono = IBM_Plex_Mono({variable:'--font-ibm-mono',subsets: ["latin"], weight:['300','100','400']});

export const metadata = {
  title: "Sarthak Chauhan",
  description: "Hey, I'm Sarthak. A third-year Computer Science student who thrives on crafting software from scratch and setting it free in the wild web",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
        <meta name="format-detection" content="date=no" />
      </Head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>
        {<Navbar />} 
        {children}
      </body>
    </html>
  );
}
