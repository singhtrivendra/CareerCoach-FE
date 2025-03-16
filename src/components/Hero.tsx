
import { useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Users, TrendingUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const childElements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach(el => {
      observer.observe(el);
    });

    return () => {
      childElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 px-4 md:px-6 bg-white dark:bg-gray-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30 mask-radial-faded">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-teal-500 blur-3xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 relative z-10">
          <div className="animate-on-scroll opacity-0 transition-opacity duration-500">
            <div className="inline-block bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              AI-Powered Career Development ✨
            </div>
          </div>

          <h1 className="animate-on-scroll opacity-0 transition-opacity duration-500 text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Your Personal{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">AI Career Coach</span>
          </h1>

          <p className="animate-on-scroll opacity-0 transition-opacity duration-500 max-w-2xl mx-auto text-xl text-muted-foreground">
            Accelerate your career growth with personalized AI coaching, interview preparation, and skill development.
          </p>

          <div className="animate-on-scroll opacity-0 transition-opacity duration-500 flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link to="/interview">
              <Button size="lg" className="group bg-green-600 hover:bg-green-700">
                Try Interview Simulator
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/skills">
              <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-black-50">
                Analyze Your Skills
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16">
          <div className="animate-on-scroll opacity-0 transition-opacity duration-500 glass-card p-4 md:p-6 rounded-xl hover-scale">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center rounded-lg mb-3">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Interview Coach</h3>
            <p className="text-muted-foreground text-sm md:text-base">Practice with AI-simulated interviews that provide real-time feedback.</p>
          </div>
          
          <div className="animate-on-scroll opacity-0 transition-opacity duration-500 glass-card p-4 md:p-6 rounded-xl hover-scale">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center rounded-lg mb-3">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Skill Development</h3>
            <p className="text-muted-foreground text-sm md:text-base">Personalized learning recommendations based on your skill gaps.</p>
          </div>
          
          <div className="animate-on-scroll opacity-0 transition-opacity duration-500 glass-card p-4 md:p-6 rounded-xl hover-scale">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center rounded-lg mb-3">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
            <p className="text-muted-foreground text-sm md:text-base">Real-time industry trends to help you make informed career decisions.</p>
          </div>
          
          <div className="animate-on-scroll opacity-0 transition-opacity duration-500 glass-card p-4 md:p-6 rounded-xl hover-scale">
            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center rounded-lg mb-3">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Mentorship</h3>
            <p className="text-muted-foreground text-sm md:text-base">Connect with AI mentors specialized in your industry for guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
