export default interface AuthService {
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isLoggedIn: () => boolean;
}
