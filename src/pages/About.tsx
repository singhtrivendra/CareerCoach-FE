
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Award, Zap, BookOpen, User, Code, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderWrapper />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-gradient-green">About CareerCoach</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in delay-100">
              Using artificial intelligence to revolutionize career development and job preparation
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in delay-200">
              <Card className="w-full max-w-sm bg-white/80 dark:bg-black/20 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Our Mission</h3>
                  <p className="text-muted-foreground text-center">
                    To empower professionals at every stage of their career with AI-driven insights and personalized guidance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="w-full max-w-sm bg-white/80 dark:bg-black/20 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Our Vision</h3>
                  <p className="text-muted-foreground text-center">
                    To create a world where every professional has access to personalized career coaching powered by advanced AI.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* AI Technology Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Technology</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                State-of-the-art artificial intelligence powering your career growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <BookOpen className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Natural Language Processing</h3>
                <p className="text-muted-foreground">
                  Advanced NLP models analyze interview responses, providing detailed feedback on communication skills, content quality, and delivery.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <User className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Emotion AI</h3>
                <p className="text-muted-foreground">
                  Real-time analysis of facial expressions, vocal tones, and speech patterns to help improve interview performance.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <Code className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Machine Learning</h3>
                <p className="text-muted-foreground">
                  Personalized skill gap analysis and tailored recommendations that adapt to your progress over time.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <MessageSquare className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Conversational AI</h3>
                <p className="text-muted-foreground">
                  Human-like mentor interaction providing contextual advice and feedback based on your specific career goals.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <Heart className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Psychometric Analysis</h3>
                <p className="text-muted-foreground">
                  AI assessment of personality traits and soft skills to match you with ideal career paths and work environments.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <Zap className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
                <p className="text-muted-foreground">
                  Immediate, actionable insights while you practice, helping you improve with each session.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 px-6 bg-green-50 dark:bg-green-900/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How CareerCoach Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive approach to career development
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Skill Assessment</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI analyzes your current skills, experience, and professional goals, identifying both strengths and areas for improvement.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Comprehensive skill gap analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Industry standard benchmarking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Personality trait assessment</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                  <p className="text-muted-foreground mb-4">
                    Based on your assessment, we create tailored learning paths from top educational platforms to address your specific skill gaps.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Curated courses from Coursera, Udemy, and more</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Adaptive recommendations as you progress</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Optimized learning paths for efficient skill building</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interview Preparation</h3>
                  <p className="text-muted-foreground mb-4">
                    Practice with our AI interview simulator that provides real-time feedback on your responses, body language, and speech patterns.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Industry-specific interview questions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Real-time feedback during practice sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Analysis of verbal and non-verbal communication</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ongoing Career Guidance</h3>
                  <p className="text-muted-foreground mb-4">
                    Get continuous support and guidance as you progress in your career journey.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Market trend insights and salary information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Career path recommendation and advancement strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>AI-powered career mentor available 24/7</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your journey with CareerCoach today and unlock your full professional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/skills">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                  Start Free Assessment
                </Button>
              </Link>
              <Link to="/interview">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-green-300 text-green-700 hover:bg-green-50">
                  Try Interview Simulator
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
