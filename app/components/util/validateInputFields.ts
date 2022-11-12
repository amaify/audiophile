interface Validation {
	errorState: boolean;
	errorMessage: string;
}

function validateText(inputValue: string) {
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
}

function validateEmail(inputValue: string) {
	const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
}

function validateNumber(inputValue: string) {
	const numberFormat = /^[0-9]*$/;

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
}

export function validateInputField(
	inputValue: string,
	inputType: string
): Validation {
	if (inputValue === "") {
		return {
			errorState: true,
			errorMessage: "Can't be empty!",
		};
	}

	if (inputType === "text") return validateText(inputValue);

	if (inputType === "email") return validateEmail(inputValue);

	if (inputType === "tel") return validateNumber(inputValue);

	return {
		errorState: false,
		errorMessage: "",
	};
}
