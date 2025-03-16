
import { useEffect, useRef, useState } from "react";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText, CheckCircle, Clock, Download, FileText, Search, Star } from "lucide-react";

// Sample guide data
const GUIDES = [
  {
    id: 1,
    title: "Complete Guide to Technical Interviews",
    description: "Master technical interviews with this comprehensive guide covering coding challenges, system design, and behavioral questions.",
    category: "Interviews",
    difficulty: "Advanced",
    duration: "60 mins",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    title: "Resume Building Masterclass",
    description: "Learn how to craft an ATS-friendly resume that gets past filters and catches the attention of hiring managers.",
    category: "Resume",
    difficulty: "Beginner",
    duration: "30 mins",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "Negotiation Strategies for Job Offers",
    description: "Negotiate with confidence using proven strategies to get the salary and benefits you deserve.",
    category: "Negotiation",
    difficulty: "Intermediate",
    duration: "45 mins",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 4,
    title: "LinkedIn Optimization Blueprint",
    description: "Transform your LinkedIn profile into a powerful career tool that attracts recruiters and opportunities.",
    category: "Networking",
    difficulty: "Beginner",
    duration: "40 mins",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 5,
    title: "Acing Behavioral Interviews",
    description: "Master the STAR method and prepare compelling stories that showcase your skills and experience.",
    category: "Interviews",
    difficulty: "Intermediate",
    duration: "35 mins",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 6,
    title: "Career Transition Roadmap",
    description: "Navigate career changes with this step-by-step guide to transitioning between industries or roles.",
    category: "Career Change",
    difficulty: "Advanced",
    duration: "65 mins",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

// Featured guide content (steps, etc.)
const FEATURED_GUIDE_STEPS = [
  {
    id: 1,
    title: "Prepare Your Resume",
    content: "Update your resume to highlight relevant skills and experiences for your target position."
  },
  {
    id: 2,
    title: "Research Target Companies",
    content: "Identify companies that align with your career goals and values. Research their culture, products, and market position."
  },
  {
    id: 3,
    title: "Optimize Your LinkedIn Profile",
    content: "Ensure your LinkedIn profile is complete, professional, and aligned with your resume."
  },
  {
    id: 4,
    title: "Network Strategically",
    content: "Connect with professionals in your target field, attend industry events, and participate in relevant online communities."
  },
  {
    id: 5,
    title: "Prepare for Interviews",
    content: "Practice common interview questions, prepare your own questions, and research each company before interviews."
  }
];

const GuideCard = ({ guide }: { guide: typeof GUIDES[0] }) => {
  return (
    <Card className="glass-card hover-scale overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img 
          src={guide.image} 
          alt={guide.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full text-xs">
            {guide.category}
          </span>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-xs font-medium">{guide.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg">{guide.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {guide.description}
        </p>
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            <span>{guide.difficulty}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{guide.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-green-600 hover:bg-green-700 mt-2">
          View Guide
        </Button>
      </CardFooter>
    </Card>
  );
};

const FeaturedGuide = () => {
  return (
    <Card className="glass-card bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-none overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            Featured Guide
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            The Ultimate Job Search Strategy Guide
          </h2>
          <p className="text-muted-foreground mb-6">
            A comprehensive 5-step approach to finding and landing your dream job in today's competitive market.
          </p>
          
          <div className="space-y-4 mb-6">
            {FEATURED_GUIDE_STEPS.map(step => (
              <div key={step.id} className="flex">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Step {step.id}: {step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <Button className="bg-green-600 hover:bg-green-700">
              Read Full Guide
            </Button>
            <Button variant="outline" className="border-green-600 text-green-700">
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:block relative">
          <img 
            src="https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
            alt="Job Search" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </Card>
  );
};

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const guideGridRef = useRef<HTMLDivElement>(null);

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

  // Filter guides based on search
  const filteredGuides = GUIDES.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderWrapper />
      
      <main className="flex-grow px-4 py-10 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="text-center space-y-3 animate-on-scroll opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Career <span className="text-gradient-green">Development</span> Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step resources to help you navigate every stage of your career journey.
            </p>
            
            <div className="max-w-xl mx-auto mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search guides by title, description or category..." 
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Featured Guide */}
          <div className="animate-on-scroll opacity-0">
            <FeaturedGuide />
          </div>
          
          {/* Guide Categories */}
          <div className="animate-on-scroll opacity-0">
            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <TabsList>
                  <TabsTrigger value="all">All Guides</TabsTrigger>
                  <TabsTrigger value="interviews">Interviews</TabsTrigger>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="networking">Networking</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center">
                  <BookText className="mr-2 h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">
                    {filteredGuides.length} Guides Available
                  </span>
                </div>
              </div>
              
              <div ref={guideGridRef} className="mt-8">
                <TabsContent value="all" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGuides.map(guide => (
                      <GuideCard key={guide.id} guide={guide} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="interviews" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGuides
                      .filter(guide => guide.category === "Interviews")
                      .map(guide => (
                        <GuideCard key={guide.id} guide={guide} />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="resume" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGuides
                      .filter(guide => guide.category === "Resume")
                      .map(guide => (
                        <GuideCard key={guide.id} guide={guide} />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="networking" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGuides
                      .filter(guide => guide.category === "Networking")
                      .map(guide => (
                        <GuideCard key={guide.id} guide={guide} />
                      ))}
                  </div>
                </TabsContent>
              </div>
              
              {filteredGuides.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No guides found matching your search.</p>
                  <Button 
                    variant="link" 
                    className="text-green-600 mt-2"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </Tabs>
          </div>
          
          {/* User Feedback */}
          <Card className="animate-on-scroll opacity-0 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-none p-6 lg:p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Can't Find What You Need?</h3>
              <p className="text-muted-foreground mb-6">
                Let us know what career guides you'd like to see, and our AI will generate personalized resources for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Describe the guide you need..." className="sm:flex-grow" />
                <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                  Request Custom Guide
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

export default Guides;
