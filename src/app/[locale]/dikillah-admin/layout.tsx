import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal • Rizkillah Ramanda',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DikillahAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
