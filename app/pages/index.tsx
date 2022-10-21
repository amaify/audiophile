import type { NextPage } from "next";
import Hero from "../components/Hero";
import Footer from "../components/shared/Footer";
import ProductThumbnails from "../components/shared/ProductThumbnails";

const Home: NextPage = () => {
	return (
		<div>
			<Hero />
			<div className="mt-[200px] mb-[168px] px-[165px]">
				<ProductThumbnails />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
