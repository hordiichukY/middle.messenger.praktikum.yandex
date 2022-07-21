import Block from '../../../core/Block'
import { withUser } from '../../../core/withUser'
import { FormInputBlock, FormInputProps } from './form-input.templ'

const FormInput = withUser(FormInputBlock as typeof Block)
export default FormInput
export { FormInputProps }
