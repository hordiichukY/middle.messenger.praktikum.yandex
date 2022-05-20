type Patterns = Record<string, RegExp>

const patterns: Patterns = {
  first_name: /^[A-ZА-Я][a-zа-я-]*$/,
  second_name: /^[A-ZА-Я][a-zа-я-]*$/,
  login: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  /* eslint-disable-line */
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$/,
  phone: /^[+]?[0-9]{10,15}$/ 
}


export const validate = (inputName: string, valueToValidate: string) => {
  if(inputName === 'retype') {
    const passwordElement = document.querySelector("[name='password']") as HTMLInputElement;
    if(passwordElement.value === valueToValidate) {
      return true; 
    }
    return false;
  }

  if(!patterns[inputName] || !valueToValidate) {
    return;
  }
  return new RegExp(patterns[inputName]).test(valueToValidate);
}