import { useEffect, useState } from "react";
import { authHandler } from "../firebaseAuthHandler";
export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authHandler.checkAuth(setUser);
  }, []);

  return {
    user,
    setUser,
  };
}
