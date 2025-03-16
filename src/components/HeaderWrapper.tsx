
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";
import { isAuthenticated, logout } from "@/services/api";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function HeaderWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
    };
    
    checkAuth();
    
    // Set up event listener for auth changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);
  
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  return (
    <div className="relative z-50">
      <Header />
      
      {/* Auth Buttons Overlay */}
      <div className="fixed top-3 md:top-4 right-4 md:right-8 z-50">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost" className="flex items-center gap-2 bg-green-600/10 hover:bg-green-600/20">
                <User size={16} className="text-green-600" />
                <span className="text-green-600">Profile</span>
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500/20">
              <LogOut size={16} className="text-red-500" />
              <span className="text-red-500 ml-1">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <AuthModal mode="login" trigger={<Button variant="outline">Login</Button>} />
            <AuthModal mode="signup" trigger={<Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>} />
          </div>
        )}
      </div>
    </div>
  );
}
