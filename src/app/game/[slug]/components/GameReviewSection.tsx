import { SectionTitle } from "@/components/Typography";
import classes from "../page.module.css";

export default function GameReviewSection() {
  return (
    <>
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
    </>
  );
}
