type InputName =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'retype'
type InputPatternsName = Exclude<InputName, 'retype'>
type Patterns = Record<InputPatternsName, RegExp>

const patterns: Patterns = {
  first_name: /^[A-ZА-Я][a-zа-я-]*$/,
  second_name: /^[A-ZА-Я][a-zа-я-]*$/,
  login: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ /* eslint-disable-line */,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$/,
  phone: /^[+]?[0-9]{10,15}$/,
}

export const validate = (inputName: InputName, valueToValidate: string) => {
  if (inputName === 'retype') {
    const passwordElement = document.querySelector(
      "[name='password']"
    ) as HTMLInputElement
    return passwordElement.value === valueToValidate
  }

  if (!patterns[inputName] || !valueToValidate) {
    return false
  }
  return new RegExp(patterns[inputName]).test(valueToValidate)
}
