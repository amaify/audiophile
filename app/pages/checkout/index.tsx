import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "../../components/shared/Input";
import Navigation from "../../components/shared/Navigation";
import Footer from "../../components/shared/Footer";
import { Meta } from "../../components/shared/Meta";
import CheckoutSummary from "../../components/Summary";
import { FormInput } from "../../Types/FormInput";
import Confirmation from "../../components/PaymentConfirmation";

const Checkout = () => {
	const router = useRouter();
	const methodOfPayment = [
		{ label: "e-Money", method: "online" },
		{ label: "Cash on Delivery", method: "cash" },
	];
	const [value, setValue] = useState<FormInput>({
		name: "",
		address: "",
		cardNumber: "",
		cardPin: "",
		city: "",
		country: "",
		emailAddress: "",
		phoneNumber: "",
		zipCode: "",
		paymentMethod: "online",
	});
	const [confirmation, setConfirmation] = useState<boolean>(false);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValue((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<section>
			{confirmation && <Confirmation setConfirmation={setConfirmation} />}
			<Meta pageTitle="Checkout" />
			<div className="bg-black h-[97px] px-xl relative z-50">
				<Navigation removeHero={true} />
			</div>
			<div className="bg-grey px-xl pt-[7.9em] pb-[14.1em]">
				<button
					className="[ body-text ] opacity-50 capitalize  hover:text-primary mb-[56px]"
					onClick={() => router.back()}
				>
					go back
				</button>

				<div className="flex gap-[30px]">
					<form className="bg-white px-[4.8em] pt-[5.4em] pb-[4.8em] w-[70%] rounded-lg">
						<h1 className="[ heading-3 ] mb-[41px]">Checkout</h1>
						<section className="flex flex-col mb-[53px]">
							<h2 className="[ sub-title ] mb-[16px]">Billing details</h2>

							<div className="flex gap-[16px] mb-[24px]">
								<Input
									control="text"
									id="name"
									label="Name"
									name="name"
									placeholder="Alexei Ward"
									type="text"
									value={value.name}
									style="w-[50%]"
									onChange={onInputChange}
								/>
								<Input
									control="text"
									id="email"
									label="Email Address"
									name="emailAddress"
									placeholder="alexei@mail.com"
									type="email"
									value={value.emailAddress}
									style="w-[50%]"
									onChange={onInputChange}
								/>
							</div>

							<Input
								control="text"
								id="telephone"
								label="Phone Number"
								name="phoneNumber"
								placeholder="+1202-555-0136"
								type="text"
								value={value.phoneNumber}
								style="w-[49%]"
								onChange={onInputChange}
							/>
						</section>

						<section className="flex flex-col mb-[53px]">
							<h2 className="[ sub-title ] mb-[16px]">Shipping info</h2>
							<Input
								control="text"
								id="address"
								label="Address"
								name="address"
								placeholder="1137 Williams Avenue"
								type="text"
								value={value.address}
								style="w-full"
								onChange={onInputChange}
							/>

							<div className="flex gap-[16px] my-[24px]">
								<Input
									control="text"
									id="zip-code"
									label="ZIP Code"
									name="zipCode"
									placeholder="10001"
									type="text"
									value={value.zipCode}
									style="w-[50%]"
									onChange={onInputChange}
								/>

								<Input
									control="text"
									id="city"
									label="City"
									name="city"
									placeholder="New York"
									type="text"
									value={value.city}
									style="w-[50%]"
									onChange={onInputChange}
								/>
							</div>
							<Input
								control="text"
								id="country"
								label="Country"
								name="country"
								placeholder="United States"
								type="text"
								value={value.country}
								style="w-[49%]"
								onChange={onInputChange}
							/>
						</section>

						<section className="flex flex-col mb-0">
							<h2 className="[ sub-title ] mb-[16px]">Payment Details</h2>

							<div className="flex gap-[16px]">
								<p className="text-[12px] text-black capitalize font-bold w-[50%]">
									Payment Method
								</p>
								<div className="flex flex-col gap-[16px] w-[50%] mb-[24px]">
									{methodOfPayment.map((m) => (
										<Input
											control="radio"
											type="radio"
											id={m.method}
											name="paymentMethod"
											value={m.method}
											label={m.label}
											style="w-full"
											onChange={onInputChange}
											checked={value.paymentMethod === m.method}
											key={m.method}
										/>
									))}
								</div>
							</div>
							{value.paymentMethod === "online" && (
								<div className="flex gap-[16px] ">
									<Input
										control="text"
										id="card-number"
										label="e-Money Number"
										name="cardNumber"
										placeholder="238521993"
										type="tel"
										value={value.cardNumber}
										style="w-[50%]"
										onChange={onInputChange}
									/>

									<Input
										control="text"
										id="card-pin"
										label="e-Money Pin"
										name="cardPin"
										placeholder="4422"
										type="tel"
										value={value?.cardPin}
										style="w-[50%]"
										onChange={onInputChange}
									/>
								</div>
							)}
						</section>
					</form>
					<CheckoutSummary setConfirmation={setConfirmation} />
				</div>
			</div>
			<Footer />
		</section>
	);
};

export default Checkout;
