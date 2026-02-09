import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Nia LeSane - CEO Application',
  description: 'Autonomous, Soulful, Powerful. A premium application featuring quantum computing integration, biometric security, and best-in-class UX.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
