import { SectionTitle } from "@/components/Typography";
import ReviewItem from "./ReviewItem";
import { getReviewByGameId } from "@/app/actions";
import { Suspense } from "react";
import { LoadingSpinner } from "@/UI/Spinner";

export interface GameReviewSectionProps {
  gameId: string;
}

export default async function GameReviewSection({
  gameId,
}: GameReviewSectionProps) {
  const reviews = await getReviewByGameId(gameId);
  return (
    <>
      <section
        className="my-12 flex flex-col gap-6"
        aria-labelledby="reviews-title"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <div className="bg-glass backdrop-blur-glass border-glass-border shadow-glass flex items-center justify-between rounded-md border-[1px] border-solid p-6">
            <SectionTitle>User Review</SectionTitle>
            <span className="text-base font-medium text-white/50">
              {reviews.length} reviews
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        </Suspense>
      </section>

      {/**
         *<?php if ($is_logged_in): ?>
            <?php if ($has_purchased && $last_order_id): ?>
              <?php if ($has_reviewed): ?>
              <!-- User has already reviewed -->
                <div className="user-review-status">
                    <span className="reviewed-badge">✅ You reviewed this game (<?php echo $user_review['rating']; ?>/5)</span>
                </div>
              <?php else: ?>

              <!-- User can write a review -->
              <div className="user-review-status">
                <a href="reviewrate.php?order_id=<?php echo $last_order_id; ?>&produk_id=<?php echo $fetch_produk['id']; ?>"
                      className="detail-review-btn"
                      role="button"
                          aria-label="Write a review for this game">
                          📝 Write a Review
                </a>
              </div>
              <?php endif; ?>
              <?php elseif (!$has_purchased): ?>
                  <!-- User hasn't purchased the game -->
                  <div className="review-restriction">
                      <span className="purchase-required">🛒 Purchase this game to write a review</span>
                  </div>
              <?php endif; ?>
              <?php else: ?>
                  <!-- Guest user -->
                <div className="guest-review-section">
                  <div className="guest-review-card">
                      <div className="guest-review-icon">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                          </svg>
                      </div>
                      <div className="guest-review-content">
                          <h3 className="guest-review-title">Join the Community</h3>
                          <p className="guest-review-message">
                              Create an account to purchase games, write reviews, and connect with other gamers.
                          </p>
                          <div className="guest-review-actions">
                              <a href="login.php" className="guest-login-btn">Login</a>
                              <a href="register.php" className="guest-register-btn">Sign Up</a>
                          </div>
                      </div>
                  </div>
                </div>
              <?php endif; ?>

              <div className="reviews-container">
                <?php
                if (mysqli_num_rows($result_reviews) > 0) {
                    while ($review = mysqli_fetch_assoc($result_reviews)) {
                ?>
                  <div className="game-card review-card">
                      <div className="review-header">
                          <div className="reviewer-info">
                              <img src="image/<?php echo !empty($review['foto']) ? $review['foto'] : 'avatar.png'; ?>"
                                    alt="<?php echo htmlspecialchars($review['username']); ?> avatar" 
                                    className="reviewer-avatar" />
                              <div className="reviewer-details">
                                  <span className="reviewer-name"><?php echo htmlspecialchars($review['username']); ?></span>
                                  <span className="review-date"><?php echo date("F j, Y", strtotime($review['created_at'])); ?></span>
                              </div>
                          </div>
                          <div className="review-rating">
                              <span className="stars">
                                  <?php echo generateStarRating($review['rating']); ?>
                              </span>
                              <span className="rating-value"><?php echo number_format($review['rating'], 1); ?>/5</span>
                          </div>
                      </div>
                      <div className="review-content">
                          <p><?php echo nl2br(htmlspecialchars($review['comment'])); ?></p>
                      </div>
                  </div>
                          <?php
                      }
                  } else {
                      ?>
                      <div className="empty-message">
                          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
    </>
  );
}
