import AsideBar from "@/components/AsideBar/AsideBar";
import { navLinks } from "./NavAsideBar";

export default function GenreNav() {
  return (
    <>
      {navLinks.map(({ label, links }) => (
        <AsideBar.Section key={label} label={label}>
          <AsideBar.Links>
            {links.map(({ href, text }) => (
              <AsideBar.Link key={href} href={href}>
                {text}
              </AsideBar.Link>
            ))}
          </AsideBar.Links>
        </AsideBar.Section>
      ))}
    </>
  );
}
