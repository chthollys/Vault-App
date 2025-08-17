import { Footer } from "@/components/Footer";
import Header from "./components/Header";
import "@/app/globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen min-w-full items-center justify-center p-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
