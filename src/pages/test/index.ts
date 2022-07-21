import { withStore } from '../../core/Store'
import { Test } from './test.templ'

// const withUser = withStore((state) => ({ ...state.currentUser }))
// const TestBlock = withUser(Test)

// const withAllStore = withStore((state) => ({ ...state }))
const TestBlock = withStore((state) => ({ ...state }))(Test)

export default TestBlock
