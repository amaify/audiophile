// import dynamic from "next/dynamic";
import MobileNav from "@/components/shared/MobileNav";
import Navigation from "@/components/shared/Navigation";

// const Navigation = dynamic(import("@/components/shared/Navigation"), { ssr: false });
// const MobileNav = dynamic(import("@/components/shared/MobileNav"), { ssr: false });

export default function NavigationLayout() {
  return (
    <>
      <Navigation removeHero={false} />
      <MobileNav />
    </>
  );
}
