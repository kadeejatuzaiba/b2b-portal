export interface User {
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}
