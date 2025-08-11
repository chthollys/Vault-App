import { AsideBar } from "@/components/AsideBar";
import { GenreNavProps } from "@/lib/types/props";

export default function GenreNav({ genres }: GenreNavProps) {
  return (
    <>
      {genres.map(({ id, name, subGenres }) => (
        <AsideBar.Section key={id} label={name}>
          <AsideBar.Links>
            {subGenres.map(({ id, name }) => (
              <AsideBar.Link key={id} href={`/games/all?category=${id}`}>
                {name}
              </AsideBar.Link>
            ))}
          </AsideBar.Links>
        </AsideBar.Section>
      ))}
    </>
  );
}
