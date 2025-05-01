import Navbar from "@/components/layout/header";

interface LocaleLayoutProps {
  children: React.ReactNode;
}

export default async function LocaleLayout({
  children,
}: LocaleLayoutProps) {


  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
