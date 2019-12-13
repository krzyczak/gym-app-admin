export default interface AuthService {
  checkSession: () => Promise<string>;
  parseHash: () => Promise<string | null>;
  authorize: () => void;
  logout: () => void;
}
