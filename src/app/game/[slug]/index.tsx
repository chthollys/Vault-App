import Image from "@/components/ImageOptimized";
import gameImg from "~/assets/images/eldenRing.png";
import UserActions from "./components/UserActions";
import classes from "./page.module.css";
import { SectionTitle } from "@/components/Typography";

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  return (
    <div className="min-w-0">
      <div className="mb-8">
        <SectionTitle>{"TITLE"}</SectionTitle>
        <p className="mt-2 text-base text-white/70">
          Game Details & Information
        </p>
      </div>

      <div className="mb-2xl">
        <div className="w-full">
          <div className="grid-cols-[1fr 1.2fr] grid">
            {/* LEFT SIDE: GAME COVER + PRICE + BUTTONS */}
            <div className="flex flex-col">
              <div className={classes["game-card detail-image-card"]}>
                <div className={classes["game-cover-container detail-cover"]}>
                  <Image
                    src={gameImg}
                    alt={"GAME IMAGE ALT"}
                    className={classes["detail-cover-img"]}
                  />
                </div>

                {/* PRICE SECTION BELOW COVER */}
                <div className={classes["detail-price-section"]}>
                  <div className={classes["game-price detail-price"]}>
                    {/** Discount price conditional rendering */}
                    <div className={classes["detail-price-main"]}>
                      <span className={classes["current-price"]}>
                        {"$GAME PRICE"}
                      </span>
                    </div>
                  </div>
                </div>

                {/** ACTION BUTTONS  */}
                <UserActions />
              </div>
            </div>

            {/** RIGHT SIDE: GAME INFO + DESCRIPTION + RATING + RECENT REVIEWS */}
            <div className={classes["detail-right-section"]}>
              <div className={classes["game-card detail-purchase-card"]}>
                {/** GAME INFO */}
                <div className={classes["detail-game-info"]}>
                  <h2 className={classes["detail-title"]}>{"GAME NAME"}</h2>
                  <p className={classes["detail-developer"]}>
                    {"DEVELOPER NAME"}
                  </p>
                  <p className={classes["detail-category"]}>
                    {"CATEGORY NAME"}
                  </p>
                </div>

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
                    <span className={classes["rating-text"]}>
                      {"RATING COMMENT"}
                    </span>
                  </div>
                </div>

                {/** RECENT RATING AND REVIEW */}
                <div className={classes["detail-recent-review"]}>
                  <h4 className={classes["recent-review-title"]}>
                    Recent Reviews
                  </h4>
                  <div className={classes["recent-review-preview"]}>
                    <div className={classes["recent-review-header"]}>
                      <span className={classes["recent-reviewer-name"]}>
                        {"REVIEWER NAME"}
                      </span>
                      <div className={classes["recent-review-rating"]}>
                        {/** Outsource stars span component */}
                        <span className={classes["stars"]}>stars...</span>
                        <span className={classes["rating-value"]}>
                          stars count
                        </span>
                      </div>
                    </div>
                    {/** Outsource stars span component */}
                    <p className={classes["recent-review-comment"]}>
                      {"RATING COMMENT"}
                    </p>
                    <button
                      type="button"
                      className={classes["view-all-reviews-btn"]}
                    >
                      View All Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className={classes["game-sections reviews-section"]}
        aria-labelledby="reviews-title"
      >
        <div className={classes["section-header"]}>
          <SectionTitle>User Review</SectionTitle>
          <span className={classes["review-count"]}>{"REVIEW ROW COUNT"}</span>
        </div>
        {/**
         *<?php if ($is_logged_in): ?>
            <?php if ($has_purchased && $last_order_id): ?>
              <?php if ($has_reviewed): ?>
              <!-- User has already reviewed -->
                <div class="user-review-status">
                    <span class="reviewed-badge">✅ You reviewed this game (<?php echo $user_review['rating']; ?>/5)</span>
                </div>
              <?php else: ?>

              <!-- User can write a review -->
              <div class="user-review-status">
                <a href="reviewrate.php?order_id=<?php echo $last_order_id; ?>&produk_id=<?php echo $fetch_produk['id']; ?>"
                      class="detail-review-btn"
                      role="button"
                          aria-label="Write a review for this game">
                          📝 Write a Review
                </a>
              </div>
              <?php endif; ?>
              <?php elseif (!$has_purchased): ?>
                  <!-- User hasn't purchased the game -->
                  <div class="review-restriction">
                      <span class="purchase-required">🛒 Purchase this game to write a review</span>
                  </div>
              <?php endif; ?>
              <?php else: ?>
                  <!-- Guest user -->
                <div class="guest-review-section">
                  <div class="guest-review-card">
                      <div class="guest-review-icon">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                          </svg>
                      </div>
                      <div class="guest-review-content">
                          <h3 class="guest-review-title">Join the Community</h3>
                          <p class="guest-review-message">
                              Create an account to purchase games, write reviews, and connect with other gamers.
                          </p>
                          <div class="guest-review-actions">
                              <a href="login.php" class="guest-login-btn">Login</a>
                              <a href="register.php" class="guest-register-btn">Sign Up</a>
                          </div>
                      </div>
                  </div>
                </div>
              <?php endif; ?>

              <div class="reviews-container">
                <?php
                if (mysqli_num_rows($result_reviews) > 0) {
                    while ($review = mysqli_fetch_assoc($result_reviews)) {
                ?>
                  <div class="game-card review-card">
                      <div class="review-header">
                          <div class="reviewer-info">
                              <img src="image/<?php echo !empty($review['foto']) ? $review['foto'] : 'avatar.png'; ?>"
                                    alt="<?php echo htmlspecialchars($review['username']); ?> avatar" 
                                    class="reviewer-avatar" />
                              <div class="reviewer-details">
                                  <span class="reviewer-name"><?php echo htmlspecialchars($review['username']); ?></span>
                                  <span class="review-date"><?php echo date("F j, Y", strtotime($review['created_at'])); ?></span>
                              </div>
                          </div>
                          <div class="review-rating">
                              <span class="stars">
                                  <?php echo generateStarRating($review['rating']); ?>
                              </span>
                              <span class="rating-value"><?php echo number_format($review['rating'], 1); ?>/5</span>
                          </div>
                      </div>
                      <div class="review-content">
                          <p><?php echo nl2br(htmlspecialchars($review['comment'])); ?></p>
                      </div>
                  </div>
                          <?php
                      }
                  } else {
                      ?>
                      <div class="empty-message">
                          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <h3>No reviews yet</h3>
                          <p>Be the first to review this game!</p>
                      </div>
                      <?php
                  }
                  ?>
              </div>
         */}
      </section>
    </div>
  );
}
