import * as React from "react";
import warning from "tiny-warning";
import { routerContext } from "./routerContext.js";
function useRouter(opts) {
  const value = React.useContext(routerContext);
  warning(
    !((opts?.warn ?? true) && !value),
    "useRouter must be used inside a <RouterProvider> component!"
  );
  return value;
}
export {
  useRouter
};
//# sourceMappingURL=useRouter.js.map
