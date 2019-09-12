export default interface AuthService {
  login: (email: string, password: string) => Promise<any>;
  isLoggedIn: () => boolean;
}
