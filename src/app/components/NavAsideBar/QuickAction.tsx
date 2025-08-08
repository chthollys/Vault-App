import { AsideBar } from "@/components/AsideBar";

export default function QuickAction() {
  return (
    <AsideBar.Section label="Quick Actions">
      <AsideBar.Links>
        <AsideBar.Link href="/">Back to Home</AsideBar.Link>
        <AsideBar.Link href="/games/all">View All Games</AsideBar.Link>
      </AsideBar.Links>
    </AsideBar.Section>
  );
}
