import gameImg from "~/assets/images/eldenRing.png";
import classes from "./FeaturedGame.module.css";
import Image from "next/image";

export default function FeaturedGame() {
  return (
    <div className="min-w-0">
      <div className={classes["featured-game"]}>
        <div className="relative h-full w-full overflow-hidden">
          <div className={classes["featured-game-track"]}>
            <div className={classes["featured-game-slide"]}>
              <a
                href={"LINK TO IMAGE #"}
                className="block h-full w-full text-inherit no-underline"
              >
                <div className={classes["featured-game-image"]}>
                  <Image src={gameImg.src} alt={"IMAGE ALT"} fill priority />
                  <div className={classes["featured-overlay"]}>
                    <div className="max-w-[600px] text-white">
                      <div className={classes["featured-badge"]}>
                        Featured Game
                      </div>
                      <h2 className={classes["featured-title"]}>
                        {"GAME NAME"}
                      </h2>

                      <div className={classes["featured-price-section"]}>
                        <span className={classes["featured-price"]}>
                          {"$888"}
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
    </div>
  );
}
