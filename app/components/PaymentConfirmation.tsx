import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import HeadphoneImage from "../assets/cart/image-xx99-mark-two-headphones.jpg";
import Image from "next/image";
import LinkButton from "./shared/Link";

interface Props {
	setConfirmation: (value: boolean) => void;
}

const Confirmation = ({ setConfirmation }: Props) => {
	return (
		<div>
			<div
				className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-10"
				onClick={() => setConfirmation(false)}
			></div>

			<div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-[48px] rounded-lg w-[540px]">
				<div className="w-[50px] h-[50px] bg-primary relative rounded-full mb-[33px]">
					<CheckIcon
						className="w-14 h-14 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
						fill="#FFFFFF"
					/>
				</div>

				<h3 className="[ heading-3 ] text-black font-bold mb-[24px]">
					<span className="block">Thank You</span>
					<span>for you order</span>
				</h3>

				<p className="[ body-text ] text-black opacity-50 font-medium mb-[24px]">
					You will receive an email confirmation shortly.
				</p>

				<div className="flex items-stretch mb-[46px] w-full">
					<div className="bg-darkGrey p-[24px] w-[65%] rounded-tl-lg rounded-bl-lg">
						<div className="flex">
							<div className="mr-4">
								<Image
									src={HeadphoneImage}
									alt="A Headphone"
									width={50}
									height={50}
								/>
							</div>

							<div className="self-center mr-auto">
								<p className="[ body-text ] uppercase text-black font-bold">
									xx99 mk II
								</p>
								<p className="text-[14px] text-black font-bold opacity-50 leading-[25px]">
									$2,999
								</p>
							</div>

							<p className="[ body-text ] font-bold text-black opacity-50">
								x1
							</p>
						</div>

						<hr className="my-3" />

						<p className="text-sm text-center font-bold text-black opacity-50 leading-4">
							and 2 other item(s)
						</p>
					</div>
					<div className="bg-black self-stretch w-[35%] rounded-tr-lg rounded-br-lg py-[42px] pl-[32px]">
						<p className="[ body-text ] text-white opacity-50 uppercase">
							grand total
						</p>
						<p className="[ body-text ] text-white font-bold">$5,446</p>
					</div>
				</div>

				<LinkButton btnText="Back to Home" btnLink="/" />
			</div>
		</div>
	);
};

export default Confirmation;
