function validateText(inputValue: string) {
  if (inputValue.length <= 4 && inputValue) return "Min. 5 Characters";
  return "";
}

function validateEmail(inputValue: string) {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!mailFormat.test(inputValue) && inputValue) return "Wrong Format";
  return "";
}

function validateNumber(inputValue: string) {
  const numberFormat = /^[0-9]*$/;
  if (inputValue.length <= 3 && inputValue) return "Min. 4 Characters";
  if (!numberFormat.test(inputValue) && inputValue) return "Must be a number";
  return "";
}

export function validateInputField(inputValue: string, inputType: string): string {
  if (inputType === "text") return validateText(inputValue);
  if (inputType === "email") return validateEmail(inputValue);
  if (inputType === "tel") return validateNumber(inputValue);

  return "";
}
