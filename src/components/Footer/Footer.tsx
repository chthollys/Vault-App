import Link from "next/link";
import { LinkItem } from "@/UI/link";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import { LinkSection } from "@/UI/link";

export default function Footer() {
  return (
    <footer role="content-info">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Vault</h3>
          <p>Your ultimate destination for digital games</p>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>
                <Link href={"#"}>Help Center</Link>
              </li>
              <li>
                <Link href={"#"}>Contact Us</Link>
              </li>
              <li>
                <Link href={"#"}>Community</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href={"#"} className="privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={"#"}>Terms of Service</Link>
              </li>
              <li>
                <Link href={"#"}>Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Vault | Upgraded by <a href={"GITHUB"}>chthollys</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

Footer.Brand = FooterBrand;
Footer.Links = FooterLinks;
Footer.LinkSection = LinkSection;
Footer.Link = LinkItem;
