import MainHeader from "@/components/MainHeader/MainHeader";
import AsideBar from "@/components/AsideBar/AsideBar";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        <main id="main-content" className="main-content">
          {/* IMPLEMENT PAYMENT NOTIFICATION*/}
          <div className="content-layout">
            <AsideBar>
              <AsideBar.Section label="Action & Adventure">
                <AsideBar.Links>
                  <AsideBar.Link href={""}>FPS Shooters</AsideBar.Link>

                  <AsideBar.Link href={""}>Action RPG</AsideBar.Link>

                  <AsideBar.Link href={""}>Battle Royale</AsideBar.Link>

                  <AsideBar.Link href={""}>Platformers</AsideBar.Link>
                </AsideBar.Links>
              </AsideBar.Section>

              <AsideBar.Section label="Strategy & Simulation">
                <AsideBar.Links>
                  <AsideBar.Link href={""}>RTS Games</AsideBar.Link>

                  <AsideBar.Link href={""}>City Builders</AsideBar.Link>

                  <AsideBar.Link href={""}>Turn-Based</AsideBar.Link>

                  <AsideBar.Link href={""}>Life Simulation</AsideBar.Link>
                </AsideBar.Links>
              </AsideBar.Section>

              <AsideBar.Section label="RPG & MMO">
                <AsideBar.Links>
                  <AsideBar.Link href={""}>MMORPG</AsideBar.Link>

                  <AsideBar.Link href={""}>JRPG</AsideBar.Link>

                  <AsideBar.Link href={""}>Indie RPG</AsideBar.Link>

                  <AsideBar.Link href={""}>Tactical RPG</AsideBar.Link>
                </AsideBar.Links>
              </AsideBar.Section>

              <AsideBar.Section label="Sports & Racing">
                <AsideBar.Links>
                  <AsideBar.Link href={""}>Racing Sims</AsideBar.Link>

                  <AsideBar.Link href={""}>Sports Games</AsideBar.Link>

                  <AsideBar.Link href={""}>Arcade Racing</AsideBar.Link>

                  <AsideBar.Link href={""}>Fighting Games</AsideBar.Link>
                </AsideBar.Links>
              </AsideBar.Section>

              <AsideBar.Section label="Indie & Casual">
                <AsideBar.Links>
                  <AsideBar.Link href={""}>Indie Games</AsideBar.Link>

                  <AsideBar.Link href={""}>Puzzle Games</AsideBar.Link>

                  <AsideBar.Link href={""}>Casual Games</AsideBar.Link>

                  <AsideBar.Link href={""}>Horror Games</AsideBar.Link>
                </AsideBar.Links>
              </AsideBar.Section>
            </AsideBar>
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
