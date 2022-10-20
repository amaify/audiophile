import type { NextPage } from "next";
import Hero from "../components/Hero";
import Footer from "../components/shared/Footer";

const Home: NextPage = () => {
	return (
		<div>
			<Hero />
			<h1>Hello world</h1>
			<Footer />
		</div>
	);
};

export default Home;
