import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import ApolloClientProvider from '@/app/ApolloClientProvider';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

// export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
      </body>
    </html>
  );
}
