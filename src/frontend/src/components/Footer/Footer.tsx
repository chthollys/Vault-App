import Link from "next/link";
import FooterBrand from "./FooterBrand";
import FooterLink from "./FooterLink";
import FooterLinkSection from "./FooterLinkSection";

export default function Footer() {
  return (
    <footer
      role="content-info"
      className="bg-glass backdrop-blur-glass-strong shadow-glass shadow-glass shadow-glass shadow-glass shadow-glass shadow-glass shadow-glass shadow-glass shadow-glass"
    >
      <div className="mx-auto my-0 grid max-w-[1400px] grid-cols-1 items-start gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-12 lg:px-8 lg:py-12">
        <FooterBrand />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FooterLinkSection label="Support">
            <FooterLink href={"#"}>Help Center</FooterLink>
            <FooterLink href={"#"}>Contact Us</FooterLink>
            <FooterLink href={"#"}>Community</FooterLink>
          </FooterLinkSection>
          <FooterLinkSection label="Legal">
            <FooterLink href={"#"}>Privacy Policy</FooterLink>
            <FooterLink href={"#"}>Terms of Service</FooterLink>
            <FooterLink href={"#"}>Refund Policy</FooterLink>
          </FooterLinkSection>
        </div>

        <div className="border-glass-border col-span-full m-0 border-t-[1px] border-solid text-center text-[0.9rem] text-white/50">
          <p className="mt-7">
            &copy; 2025 Vault | Upgraded by{" "}
            <Link
              href={"https://github.com/chthollys"}
              target="_blank"
              className="hover:text-white"
            >
              chthollys
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
