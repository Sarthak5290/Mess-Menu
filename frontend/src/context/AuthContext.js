import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAuthenticated: false,
  });

  // Load token from local storage when the app initializes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch({ type: "LOGIN", payload: { token: storedToken } });
    }
  }, []);

  // Login function using fetch
  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login successful: ", data);
      
      // Save token in local storage
      localStorage.setItem("token", data.token);
      dispatch({
        type: "LOGIN",
        payload: { user: data.user, token: data.token },
      });

      // Optional: Set a timeout to remove the token after a specific duration
      setTimeout(() => {
        logout();
      }, 60 * 60 * 1000); // Example: Log out after 1 hour
    } catch (error) {
      console.error("Login error:", error.message);
      throw error; // Rethrow error to handle in the component
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Clear token from local storage
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
