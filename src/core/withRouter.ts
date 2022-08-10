import { Router } from './Router';

export function withRouter(Component: any) {
  const router = new Router();
  return class WithRouter extends Component {
    public static componentName = Component.name;

    constructor(props: any) {
      super({ ...props, router });
    }
  };
}
