import FeaturedGame from "@/components/FeaturedGame.tsx/FeaturedGame";
import GameSection from "@/components/GameSection/GameSection";

export default function Home() {
  return (
    <>
      <div className="min-w-0">
        <FeaturedGame />
        <GameSection title="Recommended Games" href="/games/recommended" />
        <GameSection title="Discounted Games" href="/games/discounted" />
        <GameSection title="Hot Games" href="/games/hot" />
      </div>
    </>
  );
}
