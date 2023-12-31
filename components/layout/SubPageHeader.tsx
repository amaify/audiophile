import MobileNav from "../shared/MobileNav";
import Navigation from "../shared/Navigation";

const SubPageHeader = () => {
  return (
    <div className="bg-black w-full relative z-50 [ sub-page-header layout-padding ]">
      <Navigation removeHero subpageHeader />
      <MobileNav />
    </div>
  );
};

export default SubPageHeader;
