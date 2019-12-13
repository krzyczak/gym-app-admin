import Auth0 from "auth0-js";

import AuthService from "../interfaces/AuthService";

declare let history: History;

export default function createAuthService() {
  const auth0 = new Auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN!,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID!
  });

  return {
    checkSession: async () => {
      return new Promise((resolve, reject) => {
        auth0.checkSession(
          {
            responseType: "token",
            redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI!,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE!
          },
          function(err, authResult) {
            if (err !== null) {
              reject(err);
              return;
            }

            resolve(authResult.accessToken);
          }
        );
      });
    },
    authorize: () => {
      auth0.authorize({
        responseType: "token",
        redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI!,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE!
      });
    },
    logout: () => {
      auth0.logout({
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID!,
        returnTo: process.env.REACT_APP_AUTH0_REDIRECT_URI!
      });
    },
    parseHash: async () => {
      return new Promise((resolve, reject) => {
        auth0.parseHash({ hash: window.location.hash }, function(
          err,
          authResult
        ) {
          if (err) {
            reject(err);
          } else {
            if (authResult !== null) {
              resolve(authResult.accessToken);
            } else {
              resolve(null);
            }
          }

          history.replaceState({}, document.title, ".");
        });
      });
    }
  } as AuthService;
}
