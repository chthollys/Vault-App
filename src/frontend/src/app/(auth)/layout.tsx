import { Footer } from "@/components/Footer";
import Header from "./components/Header";
import "@/app/globals.css";
import ScrollToTop from "@/lib/utils/scroll-to-top";
import Hydration from "./hydration";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Hydration>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen min-w-full p-8">{children}</main>
      <Footer />
    </Hydration>
  );
}
