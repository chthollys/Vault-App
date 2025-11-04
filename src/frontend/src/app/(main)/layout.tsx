import { MainHeader } from "@/components/MainHeader";
import { Footer } from "@/components/Footer";
import "@/app/globals.css";
import { NavAsideBar } from "./components/NavAsideBar";
import ScrollToTop from "@/lib/utils/scroll-to-top";
import Hydration from "../hydration";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Hydration>
        <div id="modal"></div>
        <MainHeader />
        <ScrollToTop />
        <main
          id="main-content"
          className="main-content mx-auto my-0 min-h-screen max-w-[1600px] p-8 pt-6"
        >
          <div className="grid grid-cols-[250px_1fr] items-start gap-12">
            <NavAsideBar />
            {children}
          </div>
        </main>
        <Footer />
      </Hydration>
    </>
  );
}
