import React, { ComponentType } from "react";
import { Subtract } from "utility-types";

import AuthServiceContext from "../context/authService";
import AuthServiceInterface from "../interfaces/AuthService";

interface WithAuthService {
  authService: AuthServiceInterface | null;
}

function withAuthService<P extends WithAuthService>(WrappedComponent: ComponentType<P>) {
  return (props: Subtract<P, WithAuthService>) => (
    <AuthServiceContext.Consumer>
      {value => <WrappedComponent {...(props as P)} authService={value} />}
    </AuthServiceContext.Consumer>
  );
}

export default withAuthService;
