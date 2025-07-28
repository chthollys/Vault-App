import { useContext } from "react";
import classes from "./GameSection.module.css";
import { GameCardContext } from "./GameCard";
import { formatToUSD, formatStarRating } from "@/lib/utils/utils";

export default function GameCardInfo() {
  const { game, isInCart } = useContext(GameCardContext);
  let price = "INVALID PRICE";
  if (game && game.price) {
    price = formatToUSD(game?.price);
  }
  const starRating = formatStarRating(game?.rating);
  return (
    <div className={classes["game-info"]}>
      <div className={classes["game-price"]}>
        <span className={classes["current-price"]}>{price}</span>
      </div>
      <h3 className={classes["game-title"]}>{game?.title}</h3>
      <p className={classes["game-developer"]}>{game?.developer}</p>
      <div className={classes["game-rating"]}>
        <span className={classes["stars"]}>{starRating}</span>
        <span className={classes["rating-text"]}>
          {game?.rating === 0 ? "No rating" : game?.rating}
        </span>
      </div>
      <button
        className={`${classes["add-to-cart-btn"]} ${isInCart ? "added" : ""}`}
        data-product-id={game?.id}
        data-in-cart={isInCart ? "true" : "false"}
        onClick={() => console.log("ADD TO CART OR REDIRECT TO LOGIN")}
      ></button>
    </div>
  );
}
