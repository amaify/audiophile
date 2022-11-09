export const InputValidation = (inputName: string, inputValue: string) => {
	switch (inputName) {
		case "name":
		case "address":
		case "zipCode":
		case "city":
		case "country":
			if (inputValue === "") {
				return {
					errorState: true,
					errorMessage: "Can't be empty!",
				};
			}

			if (inputValue.length <= 4) {
				return {
					errorState: true,
					errorMessage: "Min. 5 Characters",
				};
			} else {
				return {
					errorState: false,
					errorMessage: "",
				};
			}

		case "emailAddress":
			const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (inputValue === "") {
				return {
					errorState: true,
					errorMessage: "Can't be empty!",
				};
			}

			if (!mailFormat.test(inputValue)) {
				return {
					errorState: true,
					errorMessage: "Wrong Format",
				};
			} else {
				return {
					errorState: false,
					errorMessage: "",
				};
			}
		case "cardNumber":
		case "cardPin":
		case "phoneNumber":
			const numberFormat = /^[0-9]*$/;
			if (inputValue === "") {
				return {
					errorState: true,
					errorMessage: "Can't be empty!",
				};
			}

			if (inputValue.length <= 3) {
				return {
					errorState: true,
					errorMessage: "Min. 4 Characters",
				};
			}

			if (!numberFormat.test(inputValue)) {
				return {
					errorState: true,
					errorMessage: "Must be a number",
				};
			} else {
				return {
					errorState: false,
					errorMessage: "",
				};
			}

		default:
			return {
				errorState: false,
				errorMessage: "",
			};
	}
};
