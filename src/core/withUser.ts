import { withStore } from './Store';
export const withUser = withStore((state) => ({
  currentUser: { ...state.currentUser },
}));
