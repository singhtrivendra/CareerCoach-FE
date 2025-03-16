
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { registerUser, loginUser } from "@/services/api";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  mode?: "login" | "signup";
  trigger?: React.ReactNode;
}

export default function AuthModal({ mode = "login", trigger }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  // Update isLogin when mode prop changes
  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Login
        const result = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        
        if (result) {
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          setIsOpen(false);
          window.dispatchEvent(new Event('storage')); // Trigger auth check
        }
      } else {
        // Register
        if (!formData.name) {
          toast({
            title: "Name required",
            description: "Please enter your name",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        const result = await registerUser(formData);
        
        if (result) {
          toast({
            title: "Registration successful",
            description: "Your account has been created",
          });
          // Switch to login mode after successful registration
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form when toggling
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="bg-green-600 hover:bg-green-700">{isLogin ? "Login" : "Sign Up"}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-card fixed inset-0 m-auto h-fit w-[90vw] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Fill in your details to get started with CareerCoach"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required={!isLogin}
                className="bg-background/50"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="bg-background/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-background/50"
            />
          </div>
          
          <div className="pt-4 flex flex-col space-y-2">
            <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Logging in..." : "Signing up..."}
                </>
              ) : (
                <>{isLogin ? "Login" : "Sign Up"}</>
              )}
            </Button>
            
            <Button
              type="button"
              variant="link"
              className="text-sm text-green-600"
              onClick={toggleMode}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
