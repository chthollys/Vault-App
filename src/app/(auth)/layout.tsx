import { Footer } from "@/components/Footer";
import Header from "./components/Header";
import "@/app/globals.css";
import FormErrorMsg from "./components/FormErrorMsg";
import ScrollToTop from "@/lib/utils/scroll-to-top";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen min-w-full p-8">{children}</main>
      <FormErrorMsg />
      <Footer />
    </>
  );
}
