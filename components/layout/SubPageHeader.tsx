import MobileNav from "../shared/MobileNav";
import Navigation from "../shared/Navigation";

interface Props {
  showUnderline?: boolean;
}

const SubPageHeader = ({ showUnderline = false }: Props) => {
  return (
    <div className="bg-black w-full relative z-50 xl:before:full-bleed xl:before:bg-black">
      <Navigation removeHero subpageHeader />
      <MobileNav />
    </div>
  );
};

export default SubPageHeader;
