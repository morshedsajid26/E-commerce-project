import { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginAction, logoutAction, getSession, getCurrentUser } from "@/lib/actions/auth.actions";
import { registerCustomerAction } from "@/lib/actions/online-customer.actions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    async function initAuth() {
      try {
        const session = await getSession();
        if (session) {
          // Fetch full user details from PostgreSQL including profile picture
          const fullUser = await getCurrentUser();
          if (fullUser) {
            setUser(fullUser);
          } else {
            setUser(session);
          }
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const login = async (identifier, password) => {
    try {
      const result = await loginAction(identifier, password);
      if (result.success) {
        // Fetch full profile right after login
        const fullUser = await getCurrentUser();
        const userToSet = fullUser || result.user;
        setUser(userToSet);
        toast.success("Login successful!");
        return userToSet;
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
      return null;
    }
  };

  const signup = async (name, phone, password) => {
    try {
      const result = await registerCustomerAction(name, phone, password);
      if (result.success) {
        // Fetch full profile right after registration auto-login
        const fullUser = await getCurrentUser();
        setUser(fullUser || result.user);
        toast.success("Account created and logged in!");
        return true;
      }
    } catch (error) {
      toast.error(error.message || "Signup failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      queryClient.clear();
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      login, 
      signup, 
      logout, 
      loading,
      isLoggingIn: false,
      isSigningUp: false
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
