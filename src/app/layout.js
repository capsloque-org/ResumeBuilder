import { Geist, Geist_Mono, Inter, Merriweather } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata = {
  title: "CAPSLOQUE — Professional Resume Builder",
  description:
    "Create stunning, ATS-optimized resumes in minutes. Expert-designed templates, real-time preview, and instant PDF export. Trusted by 50,000+ job seekers.",
  keywords:
    "resume builder, CV maker, professional resume, ATS resume, ATS-optimized, CAPSLOQUE, free resume builder",
  openGraph: {
    title: "CAPSLOQUE — Professional Resume Builder",
    description:
      "Create ATS-optimized resumes in minutes with expert-designed templates.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${merriweather.variable} antialiased bg-[var(--c-bg-primary)] text-[var(--c-text-primary)]`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
