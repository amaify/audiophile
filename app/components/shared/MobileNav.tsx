import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import HamburgerIcon from "@/assets/shared/tablet/icon-hamburger.svg";
import ProductThumbnails from "./ProductThumbnails";
import Brand from "./Brand";
import Cart from "../Cart/Cart";

const MobileNav = () => {
  return (
    <Popover className="relative z-50 w-full lg:hidden" as="nav">
      {({ close, open }) => (
        <>
          <section className="w-full flex items-center px-6 pt-8 pb-14 z-50 relative border-b border-b-white/20 sm:px-0">
            <Popover.Button className="w-8 h-8 mr-auto sm:mr-[4.2rem]">
              <Image src={HamburgerIcon} alt="Hamburger menu" className="w-full h-full" />
            </Popover.Button>
            <Brand />
            <Cart />
          </section>

          <Popover.Overlay className="fixed inset-0 w-screen h-screen bg-black/40 z-40" />

          <div className="w-full relative z-50">
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <div className={clsx("rounded-b-lg", open && "[ mobile-nav-popup ]")}>
                <Popover.Panel className="px-6 pb-12 pt-44 bg-white rounded-b-lg sm:px-0 md:pt-40">
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
