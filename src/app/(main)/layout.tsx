import Provider from "@/app/provider";
import { MainHeader } from "@/components/MainHeader";
import { Footer } from "@/components/Footer";
import "@/app/globals.css";
import { HydratedNavBar } from "./components/NavAsideBar";
import ScrollToTop from "@/lib/utils/scroll-to-top";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <div id="modal"></div>
      <MainHeader />
      <ScrollToTop />
      <main
        id="main-content"
        className="main-content mx-auto my-0 max-w-[1600px] p-8 pt-6"
      >
        <div className="grid grid-cols-[250px_1fr] items-start gap-12">
          <HydratedNavBar />
          <div className="min-w-0">{children}</div>
        </div>
      </main>
      <Footer />
    </Provider>
  );
}
