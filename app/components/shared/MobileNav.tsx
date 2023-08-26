import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import HamburgerIcon from "@/assets/shared/tablet/icon-hamburger.svg";
import ProductThumbnails from "./ProductThumbnails";
import Brand from "./Brand";
import Cart from "../Cart/Cart";

const MobileNav = () => {
  return (
    <Popover>
      <nav className="w-full relative lg:hidden">
        <section className="w-full flex items-center px-6 pt-8 pb-14 z-50 relative border-b border-b-white/20">
          <Popover.Button className="w-8 h-8 mr-auto md:mr-[4.2rem]">
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
            <Popover.Panel className="px-6 pb-12 pt-44 h-auto bg-white rounded-b-lg md:pt-40">
              <ProductThumbnails />
            </Popover.Panel>
          </Transition.Child>
        </div>
      </nav>
    </Popover>
  );
};

export default MobileNav;
