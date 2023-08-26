import MobileNav from "./MobileNav";
import Navigation from "./Navigation";

const SubPageHeader = () => {
  return (
    <div className="bg-black h-auto w-full px-0 relative z-50 [ sub-page-header ] md:px-[17.5rem] md:h-[9.7rem]">
      <Navigation removeHero />
      <MobileNav />
    </div>
  );
};

export default SubPageHeader;
