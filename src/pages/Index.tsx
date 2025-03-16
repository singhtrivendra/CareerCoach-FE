
import Hero from "@/components/Hero";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { ArrowRight, Sparkles, Lightbulb, Target, User, BriefcaseIcon, TrendingUp, Brain, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderWrapper />
      
      <main className="flex-grow">
        <Hero />
        
        {/* How it Works Section */}
        {/* <section className="py-16 md:py-20 px-4 md:px-6 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">How CareerCoach Works</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform adapts to your unique needs and goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="relative animate-on-scroll opacity-0">
                <div className="absolute -top-4 -left-4 w-14 h-14 bg-green-200 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-xl font-bold">
                  1
                </div>
                <Card className="pt-8 h-full glass-card hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <Sparkles className="h-9 w-9 text-green-600 mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Assess Your Skills</h3>
                    <p className="text-muted-foreground">
                      Our AI analyzes your current skills, experience, and career goals to identify strengths and opportunities.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative mt-10 md:mt-16 animate-on-scroll opacity-0">
                <div className="absolute -top-4 -left-4 w-14 h-14 bg-green-200 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-xl font-bold">
                  2
                </div>
                <Card className="pt-8 h-full glass-card hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <Lightbulb className="h-9 w-9 text-green-600 mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                    <p className="text-muted-foreground">
                      Receive customized recommendations for courses, interview practice, and skill development based on your unique profile.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative mt-10 md:mt-32 animate-on-scroll opacity-0">
                <div className="absolute -top-4 -left-4 w-14 h-14 bg-green-200 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 text-xl font-bold">
                  3
                </div>
                <Card className="pt-8 h-full glass-card hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <Target className="h-9 w-9 text-green-600 mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Accelerate Your Growth</h3>
                    <p className="text-muted-foreground">
                      Track your progress, practice with simulated interviews, and continuously improve your career prospects.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section> */}
        
        {/* Features Section */}
        {/* <section className="py-16 md:py-20 px-4 md:px-6 bg-green-50/50 dark:bg-green-900/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Powerful AI-Driven Features</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Advanced technology to supercharge your career development
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card hover-scale animate-on-scroll opacity-0 hover:border-green-300 transition-all duration-300">
                <CardContent className="p-5">
                  <User className="h-9 w-9 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Interview Simulator</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Practice with AI interviews that analyze your responses, tone, and expressions in real-time.
                  </p>
                  <Link to="/interview">
                    <Button variant="link" className="text-green-600 mt-2 p-0">Learn more →</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover-scale animate-on-scroll opacity-0 hover:border-green-300 transition-all duration-300">
                <CardContent className="p-5">
                  <Brain className="h-9 w-9 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Skill Analysis</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Identify skill gaps and strengths through comprehensive AI assessment.
                  </p>
                  <Link to="/skills">
                    <Button variant="link" className="text-green-600 mt-2 p-0">Learn more →</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover-scale animate-on-scroll opacity-0 hover:border-green-300 transition-all duration-300">
                <CardContent className="p-5">
                  <BriefcaseIcon className="h-9 w-9 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Learning Paths</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Custom learning recommendations from top platforms to build your skills effectively.
                  </p>
                  <Link to="/courses">
                    <Button variant="link" className="text-green-600 mt-2 p-0">Learn more →</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover-scale animate-on-scroll opacity-0 hover:border-green-300 transition-all duration-300">
                <CardContent className="p-5">
                  <TrendingUp className="h-9 w-9 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Stay ahead with AI-powered industry trend analysis and job market forecasts.
                  </p>
                  <Link to="/about">
                    <Button variant="link" className="text-green-600 mt-2 p-0">Learn more →</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        
        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are using CareerCoach to reach their career goals faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/skills">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 animate-pulse-slow">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-green-300 text-green-700 hover:bg-green-50">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-600" />
                <span>Full access for 7 days</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
