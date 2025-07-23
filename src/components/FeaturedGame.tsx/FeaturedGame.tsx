import gameImg from "~/assets/images/eldenRing.png";
import classes from "./FeaturedGame.module.css";
import Image from "next/image";

export default function FeaturedGame() {
  return (
    <div className={classes["featured-game"]}>
      <div className={classes["featured-game-container"]}>
        <div className={classes["featured-game-track"]}>
          <div className={classes["featured-game-slide"]}>
            <a
              href={"LINK TO IMAGE #"}
              className={classes["featured-game-link"]}
            >
              <div className={classes["featured-game-image"]}>
                <Image src={gameImg.src} alt={"IMAGE ALT"} fill priority />
                <div className={classes["featured-overlay"]}>
                  <div className="max-w-[600px] text-white">
                    <div className={classes["featured-badge"]}>
                      Featured Game
                    </div>
                    <h2 className={classes["featured-title"]}>{"GAME NAME"}</h2>

                    <div className={classes["featured-price-section"]}>
                      <span className={classes["featured-price"]}>
                        {"$PRICE"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
