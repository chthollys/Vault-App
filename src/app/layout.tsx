import Provider from "./provider";
import { MainHeader } from "@/components/MainHeader";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { HydratedNavBar } from "./components/NavAsideBar";
import ScrollToTop from "@/lib/utils/scroll-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div id="modal"></div>
          <MainHeader />
          <ScrollToTop />
          <main id="main-content" className="main-content">
            <div className="content-layout">
              <HydratedNavBar />
              <div className="min-w-0">{children}</div>
            </div>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
