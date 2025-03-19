"use client";

import Image from "next/image";
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import HamburgerIcon from "@/public/shared/tablet/icon-hamburger.svg";
import Brand from "./Brand";
import Cart from "../Cart/Cart";
import ProductThumbnails from "../../app/[category]/components/ProductThumbnails";

const MobileNav = () => {
  return (
    <Popover className="relative z-50 w-full lg:hidden" as="nav">
      {({ close, open }) => (
        <>
          <section className="w-full bg-black flex items-center pt-8 pb-14 z-50 relative border-b border-b-white/20 [ layout-padding ]">
            <PopoverButton className="size-8 mr-auto focus-visible:outline-none sm:mr-[4.2rem]">
              <Image src={HamburgerIcon} alt="Hamburger menu" className="size-full" />
            </PopoverButton>
            <Brand />
            <Cart />
          </section>

          <PopoverBackdrop
            transition
            className="fixed inset-0 size-screen bg-black/80 z-40 transition duration-300 ease-out data-[closed]:opacity-0"
          />

          <PopoverPanel
            transition
            className={clsx(
              "pb-12 pt-44 w-full bg-white rounded-b-lg sm:pb-[6.7rem] md:pt-40 relative z-50 px-[2.4rem]",
              "duration-300 transition ease-out data-[closed]:-translate-y-full"
            )}
          >
            <ProductThumbnails onClick={close} />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default MobileNav;
