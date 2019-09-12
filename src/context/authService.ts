import { createContext } from "react";
import AuthService from "../interfaces/AuthService";

export default createContext<AuthService | null>(null);
