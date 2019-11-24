import Cookies from "js-cookie";

import ApiClient from "../interfaces/ApiClient";
import AuthService from "../interfaces/AuthService";

export default function createAuthService(apiClient: ApiClient) {
  return {
    isLoggedIn() {
      return Cookies.get("connect.sid") !== undefined;
    },
    login(email, password) {
      return apiClient.post("/api/auth/login", {
        email,
        password
      });
    },
    logout() {
      return apiClient.post("/api/auth/logout", {});
    }
  } as AuthService;
}
