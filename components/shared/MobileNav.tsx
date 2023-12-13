"use client";

import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import HamburgerIcon from "@/public/shared/tablet/icon-hamburger.svg";
import Brand from "./Brand";
import Cart from "../Cart/Cart";
import ProductThumbnails from "./ProductThumbnails";

const MobileNav = () => {
  return (
    <Popover className="relative z-50 w-full lg:hidden" as="nav">
      {({ close, open }) => (
        <>
          <section className="w-full flex items-center pt-8 pb-14 z-50 relative border-b border-b-white/20">
            <Popover.Button className="w-8 h-8 mr-auto focus-visible:outline-none sm:mr-[4.2rem]">
              <Image src={HamburgerIcon} alt="Hamburger menu" className="w-full h-full" />
            </Popover.Button>
            <Brand />
            <Cart />
          </section>

          <Popover.Overlay className="fixed inset-0 w-screen h-screen bg-black/40 z-40" />

          <div className="w-full z-50 absolute">
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <div className={clsx("rounded-b-lg", open && "[ mobile-nav-popup ]")}>
                <Popover.Panel className="pb-12 pt-44 bg-white rounded-b-lg sm:pb-[6.7rem] md:pt-40">
                  <ProductThumbnails onClick={close} />
                </Popover.Panel>
              </div>
            </Transition.Child>
          </div>
        </>
      )}
    </Popover>
  );
};

export default MobileNav;
