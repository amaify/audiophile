import type { NextPage } from "next";
import { Meta } from "../components/shared/Meta";
import Button from "../components/shared/Button";

const Home: NextPage = () => {
	return (
		<div>
			<Meta />
			<h1 className="text-blue-600">Audiophile App</h1>
			<Button btnType={3} btnText="shop" />
		</div>
	);
};

export default Home;
