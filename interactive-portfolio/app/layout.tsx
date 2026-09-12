import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Analog IC Design Portfolio',
  description: 'Marwan Yasser Negm: two OTA mini projects, two analog IC design challenges, and thirteen supporting labs with complete technical reports.',
  metadataBase: new URL('https://marwan-negm-analog-ic-portfolio.marwanyasser5906.chatgpt.site'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
