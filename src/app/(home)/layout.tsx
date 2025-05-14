export const metadata = {
  title: 'Doom-Docs',
  description: 'Online advanced editor', icons: {
    icon: '/valorant.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

