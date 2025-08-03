import LeftSection from "./LeftSection";
import GameCardWrapper from "@/components/Wrapper/GameCardWrapper";
import GameInfo from "./GameInfo";
import classes from "../page.module.css";

export default function GameInfoSection() {
  return (
    <div className="mb-2xl mb-8 grid w-full grid-cols-[1fr_1.2fr] items-start gap-12">
      {/* LEFT SIDE: GAME COVER + PRICE + BUTTONS */}
      <LeftSection />

      {/** RIGHT SIDE: GAME INFO + DESCRIPTION + RATING + RECENT REVIEWS */}
      {/** .detail-right-section */}
      <div className="flex flex-col">
        <GameCardWrapper className="h-fit p-[2em]">
          <GameInfo />

          {/** GAME DESCRIPTION */}
          <div className={classes["detail-description"]}>
            <h3>About This Game</h3>
            <div
              className={classes["description-content"]}
              id="description-content"
            >
              {"GAME DESCRIPTION DETAIL"}
            </div>
            <button type="button" className={classes["read-more-btn"]}>
              Read More
            </button>
          </div>

          {/** RATING SECTION */}
          <div className={classes["detail-rating"]}>
            <h4>User Rating</h4>
            <div className={classes["game-rating"]}>
              {/** Outsource stars span component */}
              <span className={classes["stars"]}>stars..</span>
              <span className={classes["rating-text"]}>{"RATING COMMENT"}</span>
            </div>
          </div>

          {/** RECENT RATING AND REVIEW */}
          <div className={classes["detail-recent-review"]}>
            <h4 className={classes["recent-review-title"]}>Recent Reviews</h4>
            <div className={classes["recent-review-preview"]}>
              <div className={classes["recent-review-header"]}>
                <span className={classes["recent-reviewer-name"]}>
                  {"REVIEWER NAME"}
                </span>
                <div className={classes["recent-review-rating"]}>
                  {/** Outsource stars span component */}
                  <span className={classes["stars"]}>stars...</span>
                  <span className={classes["rating-value"]}>stars count</span>
                </div>
              </div>
              {/** Outsource stars span component */}
              <p className={classes["recent-review-comment"]}>
                {"RATING COMMENT"}
              </p>
              <button type="button" className={classes["view-all-reviews-btn"]}>
                View All Reviews
              </button>
            </div>
          </div>
        </GameCardWrapper>
      </div>
    </div>
  );
}
