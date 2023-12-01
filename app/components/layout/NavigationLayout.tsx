import dynamic from "next/dynamic";

const Navigation = dynamic(import("@/components/shared/Navigation"), { ssr: false });
const MobileNav = dynamic(import("@/components/shared/MobileNav"), { ssr: false });

export default function NavigationLayout() {
  return (
    <>
      <Navigation removeHero={false} />
      <MobileNav />
    </>
  );
}
