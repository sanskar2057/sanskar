import './globals.css';
import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'Sanskar Dhungana - Full Stack Developer',
  description: 'Portfolio of Sanskar Dhungana, a passionate full-stack developer from Nepal specializing in React, Next.js, FastAPI, and modern web technologies.',
  keywords: 'Full Stack Developer, React, Next.js, FastAPI, Nepal, Web Development, Portfolio',
  authors: [{ name: 'Sanskar Dhungana' }],
  creator: 'Sanskar Dhungana',
  openGraph: {
    title: 'Sanskar Dhungana - Full Stack Developer',
    description: 'Portfolio of Sanskar Dhungana, a passionate full-stack developer from Nepal',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanskar Dhungana - Full Stack Developer',
    description: 'Portfolio of Sanskar Dhungana, a passionate full-stack developer from Nepal',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body className="font-fira-code antialiased">
        {children}
      </body>
    </html>
  );
}