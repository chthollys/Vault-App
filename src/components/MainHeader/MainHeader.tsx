import Link from "next/link";

export default function MainHeader() {
  return (
    <nav className="navbar" role="navigation">
      <div className="upper-nav">
        <div className="logo">
          <Link href={"HOMEPAGE"}>Vault</Link>
        </div>

        <button className="mobile-menu-toggle">
          <span className="hamburger-icon">☰</span>
        </button>

        <div id="mobile-menu" className="menu" role="menubar">
          <Link className="menu-item" href={"ALL GAMES"}>
            All Games
          </Link>
          <Link className="menu-item" href={"NEW RELEASES"}>
            New Releases
          </Link>
          <Link className="menu-item" href={"SPECIAL OFFERS"}>
            Special Offers
          </Link>
        </div>

        <div className="search-bar" role="search">
          {"SEARCH BAR IMPLEMENTATION"}
        </div>

        <div className="nav-icons">
          <div className="nav-icon">{"cart" /* {"VIEW SHOPPING CART"} */}</div>
          <div className="nav-icon profile">
            {
              "profile" /* {'VIEW USER PROFILE'}  check if the user was logged in */
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
