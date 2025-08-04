type LoginResponse = {
  token: string | null;
  userEmail: string | null;
  userName: string | null;
  id: string | null;
  isAuthenticated: boolean;
  error: string | null;
};
