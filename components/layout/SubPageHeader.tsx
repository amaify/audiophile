import MobileNav from "../shared/MobileNav";
import Navigation from "../shared/Navigation";

interface Props {
  showUnderline?: boolean;
}

const SubPageHeader = ({ showUnderline = false }: Props) => {
  return (
    <div className="bg-black w-full relative z-50 [ sub-page-header ]">
      <Navigation removeHero subpageHeader showUnderline={showUnderline} />
      <MobileNav />
    </div>
  );
};

export default SubPageHeader;
