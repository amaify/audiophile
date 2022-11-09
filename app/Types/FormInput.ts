export interface FormInput {
	name: string;
	emailAddress: string;
	phoneNumber: string;
	address: string;
	zipCode: number | string;
	city: string;
	country: string;
	cardNumber: string | number;
	cardPin: string | number;
}

export interface InputError {
	errorState: boolean;
	errorMessage: string;
}
