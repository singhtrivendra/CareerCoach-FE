
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Target, Activity, BookOpen, TrendingUp, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import AIHelperBot from "@/components/AIHelperBot";

const Index = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('translate-y-0');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const childElements = sectionsRef.current?.querySelectorAll('.animate-section');
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
    <div className="min-h-screen flex flex-col bg-background" ref={sectionsRef}>
      <HeaderWrapper />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-50/70 to-white/10 dark:from-green-950/20 dark:to-background/10 z-0"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 max-w-4xl mx-auto animate-section opacity-0 translate-y-10 transition-all duration-700">
              <div className="inline-block py-1.5 px-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium animate-pulse-slow">
                AI-Powered Career Development ✨
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight md:leading-tight text-balance">
                Your Personal{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">
                  AI Career Coach
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Accelerate your career growth with personalized coaching, interview preparation, and skill development powered by AI.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link to="/interview">
                  <Button size="lg" className="group w-full sm:w-auto bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all">
                    Try Interview Simulator
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/skills">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-green-300 text-green-700 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all">
                    Analyze Your Skills
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-section opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm border-green-100 dark:border-green-900/30 hover:shadow-lg transition-all overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-400 to-teal-400"></div>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">10,000+</p>
                  <p className="text-muted-foreground mt-1">Successful Interviews</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm border-green-100 dark:border-green-900/30 hover:shadow-lg transition-all overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-400 to-cyan-400"></div>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-teal-600 dark:text-teal-400">85%</p>
                  <p className="text-muted-foreground mt-1">Job Offer Rate</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm border-green-100 dark:border-green-900/30 hover:shadow-lg transition-all overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">30+</p>
                  <p className="text-muted-foreground mt-1">Industry Verticals</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-section opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How CareerCoach.AI Works</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Our intelligent platform adapts to your unique needs and career goals
              </p>
            </div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-24 left-1/2 h-[calc(100%-6rem)] w-1 bg-gradient-to-b from-green-300 to-teal-500 transform -translate-x-1/2 rounded hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-100">
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/30 blur-xl transform scale-150 opacity-70"></div>
                      <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        1
                      </div>
                    </div>
                    <Card className="w-full mt-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-green-100 dark:border-green-900/30 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <Sparkles className="h-10 w-10 text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Assess Your Skills</h3>
                        <p className="text-muted-foreground">
                          Our AI analyzes your current skills, experience, and goals to identify strengths and improvement areas.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-200">
                  <div className="relative z-10 flex flex-col items-center md:mt-20">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-teal-100 dark:bg-teal-900/30 blur-xl transform scale-150 opacity-70"></div>
                      <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        2
                      </div>
                    </div>
                    <Card className="w-full mt-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-teal-100 dark:border-teal-900/30 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <Activity className="h-10 w-10 text-teal-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                        <p className="text-muted-foreground">
                          Receive customized recommendations for courses, interview preparation, and skill development.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-300">
                  <div className="relative z-10 flex flex-col items-center md:mt-40">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan-100 dark:bg-cyan-900/30 blur-xl transform scale-150 opacity-70"></div>
                      <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        3
                      </div>
                    </div>
                    <Card className="w-full mt-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-cyan-100 dark:border-cyan-900/30 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <Target className="h-10 w-10 text-cyan-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Accelerate Your Growth</h3>
                        <p className="text-muted-foreground">
                          Track your progress, practice with simulated interviews, and continuously improve your career prospects.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-green-950/10 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 animate-section opacity-0 translate-y-10 transition-all duration-700">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-2/3">
                  <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-600 to-teal-600 text-white">
                    <CardContent className="p-8 md:p-10">
                      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Powerful AI-Driven Features</h2>
                      <p className="text-lg md:text-xl text-white/90">
                        Advanced technology to supercharge your career development
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:w-1/3">
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-400">Why Our AI Features Matter</h3>
                      <p className="text-muted-foreground">
                        Traditional career coaching is expensive and limited by human availability. Our AI-powered platform provides expert guidance 24/7, making professional development accessible to everyone.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-100 group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <MessageCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Interview Simulator</h3>
                    <p className="text-muted-foreground mb-4">
                      Practice with AI interviews that analyze your responses and provide real-time feedback to improve your performance.
                    </p>
                    <Link to="/interview" className="text-green-600 dark:text-green-400 font-medium inline-flex items-center group/link">
                      Try now
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-200 group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                      <BookOpen className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Skill Analysis</h3>
                    <p className="text-muted-foreground mb-4">
                      Identify your skill gaps and strengths through our comprehensive AI assessment and receive a detailed report.
                    </p>
                    <Link to="/skills" className="text-teal-600 dark:text-teal-400 font-medium inline-flex items-center group/link">
                      Analyze skills
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-300 group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
                      <Target className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Learning Paths</h3>
                    <p className="text-muted-foreground mb-4">
                      Custom learning recommendations from top platforms to build your skills effectively and efficiently.
                    </p>
                    <Link to="/courses" className="text-cyan-600 dark:text-cyan-400 font-medium inline-flex items-center group/link">
                      Explore courses
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-400 group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <TrendingUp className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Market Insights</h3>
                    <p className="text-muted-foreground mb-4">
                      Stay ahead with AI-powered industry trend analysis and job market forecasts updated in real-time.
                    </p>
                    <Link to="/market-trends" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center group/link">
                      View trends
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mt-12 animate-section opacity-0 translate-y-10 transition-all duration-700 delay-500">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30 overflow-hidden">
                <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-green-400 to-teal-500"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="bg-gradient-to-br from-green-400 to-teal-500 p-4 rounded-full text-white">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">AI Technology That Learns With You</h3>
                      <p className="text-muted-foreground">Our advanced machine learning models adapt to your progress, providing increasingly personalized career guidance as you use the platform.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 animate-section opacity-0 translate-y-10 transition-all duration-700">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-2/3">
                  <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-teal-600 to-blue-600 text-white">
                    <CardContent className="p-8 md:p-10">
                      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">What Users Say</h2>
                      <p className="text-lg md:text-xl text-white/90">
                        Success stories from professionals who accelerated their careers with our platform
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:w-1/3">
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-r-4 border-r-teal-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-teal-700 dark:text-teal-400">Real Results</h3>
                      <p className="text-muted-foreground">
                        Don't just take our word for it. Hear directly from professionals who have transformed their careers using our AI coaching platform.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-100">
                <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-semibold text-lg">
                        S
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-lg">Sarah Johnson</h4>
                        <p className="text-muted-foreground">Software Engineer</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "The interview simulator helped me land my dream job at a top tech company. The AI feedback was incredibly insightful and prepared me for the exact questions I faced!"
                    </p>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-200">
                <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-lg">
                        M
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-lg">Michael Chen</h4>
                        <p className="text-muted-foreground">Product Manager</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "The skill analysis identified gaps in my product management knowledge that I wasn't aware of. The recommended courses were exactly what I needed to advance in my career."
                    </p>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-section opacity-0 translate-y-10 transition-all duration-700 delay-300">
                <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-100 dark:border-green-900/30 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                        J
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-lg">Jessica Taylor</h4>
                        <p className="text-muted-foreground">Marketing Director</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "The market trends feature helped me pivot my career into digital marketing just as the industry was taking off. I was able to get ahead of the curve and secure a leadership position."
                    </p>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-green-950/10 dark:via-teal-950/10 dark:to-cyan-950/10">
          <div className="max-w-5xl mx-auto text-center animate-section opacity-0 translate-y-10 transition-all duration-700">
            <div className="inline-block mb-4">
              <div className="p-1 rounded-full bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400">
                <div className="bg-white dark:bg-gray-900 rounded-full px-6 py-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 font-medium">
                    Start today, succeed tomorrow
                  </span>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Join thousands of professionals who are using CareerCoach.AI to reach their career goals faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link to="/skills">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 border-0 text-white shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-green-300 text-green-700 hover:bg-green-50 shadow hover:shadow-lg transition-all">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
              <div className="flex items-center bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Full access for 7 days</span>
              </div>
              <div className="flex items-center bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AIHelperBot />
    </div>
  );
}

export default Index;