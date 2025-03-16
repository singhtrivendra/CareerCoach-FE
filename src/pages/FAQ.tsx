
import { useState, useEffect } from "react";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, MessageSquareText, Search, Send, ThumbsUp, User } from "lucide-react";

// Sample FAQ data organized by categories
const FAQ_DATA = {
  general: [
    {
      id: "gen-1",
      question: "What is CareerCoach?",
      answer: "CareerCoach is an AI-powered career development platform that helps professionals accelerate their career growth through personalized skill assessments, interview preparation, and targeted learning recommendations."
    },
    {
      id: "gen-2",
      question: "How do I get started with CareerCoach?",
      answer: "Getting started is easy! Simply create a free account, complete your initial skill assessment, and you'll receive personalized recommendations for your career development journey."
    },
    {
      id: "gen-3",
      question: "Is CareerCoach free to use?",
      answer: "We offer both free and premium plans. The free plan gives you access to basic features, while the premium plan unlocks advanced AI coaching, unlimited interview practice, and personalized learning paths."
    },
    {
      id: "gen-4",
      question: "How accurate are the AI assessments?",
      answer: "Our AI assessments are built on advanced machine learning models trained on millions of career profiles and outcomes. They achieve over 90% accuracy when validated against expert human assessments."
    }
  ],
  account: [
    {
      id: "acc-1",
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
    },
    {
      id: "acc-2",
      question: "Can I change my email address?",
      answer: "Yes, you can change your email address in your account settings. You'll need to verify the new email address before the change takes effect."
    },
    {
      id: "acc-3",
      question: "How do I delete my account?",
      answer: "To delete your account, go to your account settings and select 'Delete Account'. Please note that this action is permanent and all your data will be removed from our systems."
    }
  ],
  features: [
    {
      id: "feat-1",
      question: "How does the Interview Simulator work?",
      answer: "Our Interview Simulator uses AI to conduct realistic mock interviews. It analyzes your responses, tone, and delivery to provide feedback on how you can improve. You can practice with industry-specific questions tailored to your target roles."
    },
    {
      id: "feat-2",
      question: "What types of skills can CareerCoach assess?",
      answer: "CareerCoach can assess both technical and soft skills. For technical skills, we cover programming languages, design tools, data analysis, and more. For soft skills, we assess communication, leadership, problem-solving, teamwork, and many others."
    },
    {
      id: "feat-3",
      question: "How are course recommendations generated?",
      answer: "Our AI analyzes your current skill profile and career goals to identify skill gaps. It then recommends courses from top learning platforms that will help you close these gaps and advance in your career path."
    },
    {
      id: "feat-4",
      question: "Can I get feedback on my resume?",
      answer: "Yes! Our premium plan includes AI-powered resume analysis and feedback. The system checks your resume against best practices and industry standards, highlighting areas for improvement and suggesting optimizations."
    }
  ],
  privacy: [
    {
      id: "priv-1",
      question: "How is my data used and protected?",
      answer: "We take data privacy seriously. Your personal information is encrypted and stored securely. We use your data only to provide and improve our services. We never sell your personal information to third parties."
    },
    {
      id: "priv-2",
      question: "Can employers see my profile or assessment results?",
      answer: "No, employers cannot access your profile or assessment results unless you explicitly choose to share them. You have complete control over who can see your information."
    }
  ],
  billing: [
    {
      id: "bill-1",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay."
    },
    {
      id: "bill-2",
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. Your premium access will continue until the end of your current billing period."
    },
    {
      id: "bill-3",
      question: "Do you offer refunds?",
      answer: "We offer a 7-day money-back guarantee for all new premium subscriptions. If you're not satisfied with our service, contact our support team within 7 days of your purchase for a full refund."
    }
  ]
};

// Community Q&A
const COMMUNITY_QA = [
  {
    id: "comm-1",
    question: "What's the best way to prepare for a technical interview at FAANG companies?",
    answer: "For FAANG technical interviews, focus on algorithmic problem-solving, system design, and behavioral questions. Practice on platforms like LeetCode, review data structures & algorithms, prepare your past project stories, and conduct mock interviews. Our AI Interview Simulator has FAANG-specific modules to help you prepare effectively.",
    askedBy: "SoftwareDevAspiring",
    answeredBy: "CareerCoach Team",
    upvotes: 42,
    time: "2 days ago"
  },
  {
    id: "comm-2",
    question: "How do I transition from a technical role to product management?",
    answer: "Transitioning to product management requires developing business acumen, user empathy, and cross-functional communication skills. Start by volunteering for product-related tasks in your current role, learn product management methodologies, build a portfolio of product work, and network with product managers. Our Career Transition Guide for Technical to PM roles provides a detailed roadmap.",
    askedBy: "TechEngineer123",
    answeredBy: "CareerCoach Team",
    upvotes: 37,
    time: "1 week ago"
  },
  {
    id: "comm-3",
    question: "What certifications are most valuable for data scientists in 2023?",
    answer: "The most valuable data science certifications in 2023 include AWS Certified Data Analytics, Google Professional Data Engineer, Microsoft Certified: Azure Data Scientist Associate, and TensorFlow Developer Certificate. The best choice depends on your specialization and target industry. Our Skills Analysis tool can recommend the most relevant certifications based on your profile and goals.",
    askedBy: "DataDriven2023",
    answeredBy: "AI Expert Advisor",
    upvotes: 29,
    time: "2 weeks ago"
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState<{[key: string]: typeof FAQ_DATA.general}>({...FAQ_DATA});
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Animation for elements when they come into view
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
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  // Filter FAQs based on search and category
  useEffect(() => {
    if (!searchQuery && activeCategory === "all") {
      setFilteredFAQs({...FAQ_DATA});
      return;
    }
    
    const filtered: {[key: string]: typeof FAQ_DATA.general} = {};
    
    Object.entries(FAQ_DATA).forEach(([category, questions]) => {
      // Skip if specific category is selected and this isn't it
      if (activeCategory !== "all" && activeCategory !== category) return;
      
      // Filter by search query if present
      const matchingQuestions = searchQuery 
        ? questions.filter(item => 
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : questions;
      
      if (matchingQuestions.length > 0) {
        filtered[category] = matchingQuestions;
      }
    });
    
    setFilteredFAQs(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderWrapper />
      
      <main className="flex-grow px-4 py-10 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="text-center space-y-3 animate-on-scroll opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Frequently Asked <span className="text-gradient-green">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about CareerCoach and how to get the most from our platform.
            </p>
            
            <div className="max-w-xl mx-auto mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for answers..." 
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* FAQ Categories */}
          <div className="animate-on-scroll opacity-0">
            <div className="flex justify-center mb-8">
              <TabsList className="gap-2">
                <TabsTrigger 
                  value="all" 
                  className={activeCategory === "all" ? "bg-green-600 text-white" : ""}
                  onClick={() => setActiveCategory("all")}
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="general" 
                  className={activeCategory === "general" ? "bg-green-600 text-white" : ""}
                  onClick={() => setActiveCategory("general")}
                >
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className={activeCategory === "account" ? "bg-green-600 text-white" : ""}
                  onClick={() => setActiveCategory("account")}
                >
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="features" 
                  className={activeCategory === "features" ? "bg-green-600 text-white" : ""}
                  onClick={() => setActiveCategory("features")}
                >
                  Features
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className={activeCategory === "privacy" ? "bg-green-600 text-white" : ""}
                  onClick={() => setActiveCategory("privacy")}
                >
                  Privacy
                </TabsTrigger>
                <TabsTrigger 
                  value="billing" 
                  className={activeCategory === "billing" ? "bg-green-600 text-white" : ""}
                  onClick={() => setActiveCategory("billing")}
                >
                  Billing
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Render FAQs by category */}
            {Object.keys(filteredFAQs).length > 0 ? (
              Object.entries(filteredFAQs).map(([category, questions]) => (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 capitalize">{category} Questions</h2>
                  <Card className="glass-card">
                    <CardContent className="p-4 md:p-6">
                      <Accordion type="single" collapsible className="w-full space-y-4">
                        {questions.map((item) => (
                          <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4 hover:bg-muted/10">
                            <AccordionTrigger className="text-left text-base font-medium py-4">
                              <div className="flex items-start">
                                <HelpCircle className="h-5 w-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{item.question}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 text-muted-foreground pl-8">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
                <Button 
                  variant="link" 
                  className="text-green-600 mt-2"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Community Q&A Section */}
          <div className="animate-on-scroll opacity-0 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Community Q&A</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                Ask a Question
              </Button>
            </div>
            
            <div className="space-y-4">
              {COMMUNITY_QA.map((qa) => (
                <Card key={qa.id} className="glass-card">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{qa.askedBy}</p>
                          <p className="text-xs text-muted-foreground">{qa.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        <ThumbsUp className="h-4 w-4 mr-1" /> {qa.upvotes}
                      </Button>
                    </div>
                    <CardTitle className="text-base mt-2">
                      <MessageSquareText className="h-4 w-4 inline-block mr-2 text-green-600" />
                      {qa.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mr-2">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <p className="text-sm font-medium">{qa.answeredBy}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{qa.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Can't find answer section */}
          <Card className="animate-on-scroll opacity-0 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-none p-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Can't Find Your Answer?</h3>
              <p className="text-muted-foreground mb-6">
                Ask our AI assistant, and we'll provide an immediate response or connect you with our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Type your question here..." className="sm:flex-grow" />
                <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                  <Send className="h-4 w-4 mr-2" /> Ask AI Assistant
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
