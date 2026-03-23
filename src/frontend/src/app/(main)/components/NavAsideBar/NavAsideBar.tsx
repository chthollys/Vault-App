"use client";

import { AsideBar } from "@/components/AsideBar";
import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { usePathname } from "next/navigation";
import useGenres from "@/app/hooks/useGenres";
import useIsMobile from "@/app/hooks/useIsMobile";
import QuickAction from "./QuickAction";
import GenreNav from "./GenresNav";
import GenresCheckbox from "./GenresCheckbox";
import { useEffect, useState } from "react";

export default function NavAsideBar() {
  const path = usePathname();
  const { data: genres } = useGenres();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const noAsideBarRoute = ["/cart"];
  if (noAsideBarRoute.includes(path)) return null;

  const isGamePage = path.startsWith("/game/");
  const isGamesAll = path === "/games/all";
  const isHome = path === "/";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [path]);

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      return;
    }
  }, [isMobile, isMobileMenuOpen]);

  const asideSections = (
    <>
      {(isGamePage || isGamesAll) && <QuickAction />}
      {isGamesAll && genres && <GenresCheckbox genres={genres} />}
      {(isHome || isGamePage) && genres && <GenreNav genres={genres} />}
    </>
  );

  return (
    <div className="w-full md:w-auto">
      <button
        type="button"
        className="bg-glass backdrop-blur-glass-strong border-glass shadow-glass mb-4 inline-flex w-full items-center justify-between rounded-[1rem] border-[1px] border-solid px-4 py-3 text-left text-sm font-semibold tracking-wide uppercase md:hidden"
        onClick={() => {
          if (!isMobile) return;
          setIsMobileMenuOpen((open) => !open);
        }}
        aria-expanded={isMobileMenuOpen}
        aria-controls="main-nav-asidebar"
        aria-haspopup="dialog"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isMobileMenuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      <div id="main-nav-asidebar" className="hidden md:block">
        <AsideBar>{asideSections}</AsideBar>
      </div>

      <Modal
        isOpen={isMobile && isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        backdrop="opaque"
        placement="top-center"
        scrollBehavior="inside"
        hideCloseButton
        classNames={{
          backdrop: "bg-black/60 backdrop-blur-[2px]",
          wrapper: "items-start px-4 pt-20 pb-4 md:hidden",
          base: "m-0 w-full max-w-none shadow-none bg-nav-bar",
        }}
      >
        <ModalContent>
          <ModalBody className="p-0">
            <AsideBar className="w-full max-w-none">
              <div className="grid w-full grid-cols-2 gap-x-6">
                {asideSections}
              </div>
            </AsideBar>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
