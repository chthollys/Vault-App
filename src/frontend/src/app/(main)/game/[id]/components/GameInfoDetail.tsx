import type { Genre } from "@repo/types/src";

export interface GameInfoDetailProps {
  name: string;
  genres: { genre: Genre }[];
  developer: string;
  publisher?: string;
}

export default function GameInfoDetail({
  name,
  genres,
  developer,
  publisher = developer,
}: GameInfoDetailProps) {
  return (
    <div className="mb-8 flex flex-col border-b-[1px] border-solid border-b-white/10 pb-6 text-left">
      <h2 className="mx-0 mt-0 mb-3 text-[2.5rem] leading-[1.2] font-extrabold text-white/90">
        {name}
      </h2>
      <p className="mx-0 mt-0 mb-2 text-[1.2rem] font-medium text-white/50">
        {developer}
      </p>
      {genres.map(({ genre }) => (
        <p
          key={genre.id}
          className="text-primary m-0 inline-block w-fit rounded-[20px] border-[0.5px] border-solid border-[rgba(139,_92,_246,_0.3)] bg-[rgba(139,_92,_246,_0.15)] px-4 py-2 text-[0.9rem] font-semibold"
        >
          {genre.name}
        </p>
      ))}
    </div>
  );
}
