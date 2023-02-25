import NotAllowed from "@/components/NotAllowed";
import React, { ComponentType, useState } from "react";
import { useIsomorphicLayoutEffect } from "swr/_internal";
interface WithAuthProps {
  authenticated: boolean;
}
const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithAuthProps> => {
  return function WithAuth(props: P & WithAuthProps) {
    const [authenticated, setAuthenticated] = useState(false);

    useIsomorphicLayoutEffect(() => {
      const token = localStorage.getItem("isLogged");
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }, []);

    if (authenticated) {
      return <WrappedComponent {...props} authenticated={authenticated} />;
    } else {
      return <NotAllowed />;
    }
  };
};

export default withAuth;
