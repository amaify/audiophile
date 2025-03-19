import MobileNav from "@/components/shared/MobileNav";
import Navigation from "@/components/shared/Navigation";

export default function NavigationLayout() {
  return (
    <>
      <Navigation removeHero={false} />
      <MobileNav />
    </>
  );
}
