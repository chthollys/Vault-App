import Link from "next/link";
import classes from "./GameSection.module.css";
import { GameSectionContext } from "./GameSection";
import { useContext } from "react";

export default function GameSectionHeader() {
  const { title, label, href } = useContext(GameSectionContext);
  return (
    <div className={classes["section-header"]}>
      <h2 className={classes["section-title"]} id="recommended-title">
        {title}
      </h2>

      <Link href={href}>
        <button
          className={classes["view-all-btn"]}
          aria-label={`${label} ${title}`}
        >
          {label}
        </button>
      </Link>
    </div>
  );
}
