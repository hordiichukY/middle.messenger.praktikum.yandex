import { withStore } from './Store'
export const WithUser = withStore((state) => ({
  currentUser: { ...state.currentUser },
}))
