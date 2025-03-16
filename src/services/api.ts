import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "/api"; // Backend URL

const handleApiError = (error: any) => {
  console.error("API Error:", error);
  toast({
    title: "Error",
    description: error.message || "Something went wrong",
    variant: "destructive",
  });
  return null;
};

// Auth Endpoints
export const registerUser = async (userData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Auth Helper Functions
export const isAuthenticated = () => !!localStorage.getItem("authToken");

export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/";
};
