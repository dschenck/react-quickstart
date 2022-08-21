import React from "react";
import { Route, Redirect } from "react-router-dom";

import session from "../contexts/session";

export function PublicRoute({ component: Component, ...rest }) {
   return (
      <Route {...rest} render={(props) => <Component {...props} />}></Route>
   );
}

export function AuthRoute({ component: Component, ...rest }) {
   const context = React.useContext(session.context);

   return (
      <Route
         {...rest}
         render={(props) => {
            if (context && context.user) {
               return <Component {...props} />;
            }
            return <Redirect to="/login" />;
         }}
      ></Route>
   );
}
