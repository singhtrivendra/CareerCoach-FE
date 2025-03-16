
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import SkillAnalysis from "@/components/SkillAnalysis";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated } from "@/services/api";

const Skills = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access the full skills analysis",
        variant: "destructive",
      });
    }
  }, [toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />
      
      <main className="flex-grow pt-28 pb-20 px-6 bg-gradient-to-b from-green-50/50 to-transparent dark:from-green-900/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-green">Skills Analysis</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Identify your strengths and skill gaps with AI-powered analysis based on industry standards
            </p>
          </div>
          
          <SkillAnalysis />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Skills;
