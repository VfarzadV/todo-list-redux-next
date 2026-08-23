import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/redux/StoreProvider';

export const metadata: Metadata = {
  title: 'تودولیست من',
  description: 'یک برنامه مدیریت کارهای روزانه با ریداکس و نکست',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-100 text-gray-800 font-sans min-h-screen">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}