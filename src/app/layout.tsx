import Provider from "./provider";
import MainHeader from "@/components/MainHeader/MainHeader";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import NavAsideBar from "./components/NavAsideBar";

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
          <main id="main-content" className="main-content">
            <div className="content-layout">
              <NavAsideBar />
              {children}
            </div>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
