import { useState, useEffect } from "react";
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
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ArrowUpRight, 
  BriefcaseIcon, 
  Building, 
  ChevronUp, 
  Download, 
  Filter, 
  Globe, 
  Info, 
  Medal, 
  PieChart as PieChartIcon, 
  Search, 
  TrendingUp, 
  Users 
} from "lucide-react";

// Sample data for charts
const jobGrowthData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 4200 },
  { name: "Mar", value: 5800 },
  { name: "Apr", value: 5500 },
  { name: "May", value: 6800 },
  { name: "Jun", value: 7000 },
  { name: "Jul", value: 6800 },
  { name: "Aug", value: 7500 },
  { name: "Sep", value: 8200 },
  { name: "Oct", value: 8000 },
  { name: "Nov", value: 9800 },
  { name: "Dec", value: 10000 },
];

const skillDemandData = [
  { name: "Data Science", value: 85 },
  { name: "Machine Learning", value: 78 },
  { name: "Cloud Computing", value: 92 },
  { name: "DevOps", value: 70 },
  { name: "Full Stack Dev", value: 88 },
  { name: "UX/UI Design", value: 65 },
  { name: "Cybersecurity", value: 95 },
  { name: "Blockchain", value: 55 },
];

const salaryComparisonData = [
  { name: "Entry", tech: 75000, nonTech: 55000 },
  { name: "Mid", tech: 120000, nonTech: 80000 },
  { name: "Senior", tech: 170000, nonTech: 110000 },
  { name: "Lead", tech: 210000, nonTech: 140000 },
];

const industryGrowthData = [
  { name: "Healthcare", value: 23 },
  { name: "Fintech", value: 18 },
  { name: "EdTech", value: 14 },
  { name: "E-commerce", value: 25 },
  { name: "Remote Work", value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Top companies hiring
const topCompaniesData = [
  { 
    name: "TechGiant Inc", 
    openings: 342, 
    growth: "+12%", 
    topRoles: ["Software Engineer", "Product Manager", "Data Scientist"],
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  { 
    name: "Global Finance", 
    openings: 218, 
    growth: "+8%", 
    topRoles: ["Financial Analyst", "Risk Manager", "Blockchain Developer"],
    logo: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  { 
    name: "HealthTech Solutions", 
    openings: 275, 
    growth: "+17%", 
    topRoles: ["Healthcare Analyst", "ML Engineer", "UX Researcher"],
    logo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  { 
    name: "Digital Education", 
    openings: 187, 
    growth: "+15%", 
    topRoles: ["Content Developer", "EdTech Specialist", "Full Stack Developer"],
    logo: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
];

// Industry reports
const industryReports = [
  {
    title: "2023 Technology Job Market Outlook",
    description: "Comprehensive analysis of emerging trends, challenges, and opportunities in the tech job market.",
    date: "June 2023",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Remote Work Impact on Salaries",
    description: "How location-independent work is reshaping compensation strategies across industries.",
    date: "July 2023",
    image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
  },
  {
    title: "AI and Automation: Future of Jobs",
    description: "Exploring how artificial intelligence and automation are transforming job roles and creating new opportunities.",
    date: "August 2023",
    image: "https://images.unsplash.com/photo-1677442135133-4da422b6d6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
  }
];

// AI-generated insights (simulated)
const aiInsights = [
  "Based on current trends, demand for cybersecurity professionals is projected to grow 33% in the next year.",
  "Companies are increasingly valuing soft skills like communication and adaptability alongside technical expertise.",
  "Remote work options increase candidate pool by 85% for most tech positions.",
  "Professionals with cloud computing skills command 25% higher salaries on average."
];

const MarketTrends = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Animation for elements when they come into view
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderWrapper />
      
      <main className="flex-grow px-4 py-28 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="text-center space-y-3 animate-on-scroll opacity-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Career <span className="text-gradient-green">Market</span> Trends
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay ahead with real-time insights into job markets, industry growth, and emerging skills.
            </p>
            
            <div className="max-w-xl mx-auto mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search market trends, industries, or skills..." 
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="animate-on-scroll opacity-0">
            <div className="border-b mb-8">
              <div className="flex justify-between items-center">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills Demand</TabsTrigger>
                  <TabsTrigger value="industries">Industries</TabsTrigger>
                  <TabsTrigger value="companies">Top Companies</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" className="mb-4">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
            </div>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-card hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Overall Job Growth</p>
                        <h3 className="text-2xl font-bold mt-1">+12.4%</h3>
                        <p className="text-xs text-muted-foreground mt-1">vs last quarter</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Emerging Skills</p>
                        <h3 className="text-2xl font-bold mt-1">8 New</h3>
                        <p className="text-xs text-muted-foreground mt-1">in high demand</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Medal className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Remote Opportunities</p>
                        <h3 className="text-2xl font-bold mt-1">52%</h3>
                        <p className="text-xs text-muted-foreground mt-1">of all new positions</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Average Salary Increase</p>
                        <h3 className="text-2xl font-bold mt-1">7.2%</h3>
                        <p className="text-xs text-muted-foreground mt-1">year-over-year</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card p-6 animate-on-scroll opacity-0">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">Job Growth Trends</CardTitle>
                      <Info className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={jobGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="glass-card p-6 animate-on-scroll opacity-0">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">Top Skills in Demand</CardTitle>
                      <Info className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={skillDemandData} layout="vertical" margin={{ top: 10, right: 10, left: 50, bottom: 0 }}>
                        <CartesianGrid horizontal strokeDasharray="3 3" />
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              {/* Secondary Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card p-6 animate-on-scroll opacity-0">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">Salary Comparison by Level</CardTitle>
                      <Info className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salaryComparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tech" name="Tech Industry" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar dataKey="nonTech" name="Non-Tech Industry" fill="#82ca9d" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="glass-card p-6 animate-on-scroll opacity-0">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">Fastest Growing Industries</CardTitle>
                      <Info className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={industryGrowthData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {industryGrowthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              {/* AI Insights Section */}
              <Card className="glass-card animate-on-scroll opacity-0 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="p-6 lg:p-8 lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <span className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-lg mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-600"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m16 6-4 4-4-4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg>
                      </span>
                      AI-Generated Market Insights
                    </h3>
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-3 mt-0.5">
                            <ChevronUp className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-muted-foreground">{insight}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Get Personalized Insights
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:block relative">
                    <img 
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80" 
                      alt="AI Career Insights" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Other tabs content would go here */}
            <TabsContent value="skills">
              <Card className="glass-card p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl font-bold">Skills In Demand</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-6">
                    Detailed analysis of the most in-demand skills across different industries and roles.
                  </p>
                  <p>Content for Skills Demand tab coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="industries">
              <Card className="glass-card p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl font-bold">Industry Growth Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-6">
                    Comprehensive breakdown of growth trends across different industries and sectors.
                  </p>
                  <p>Content for Industries tab coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="companies">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Top Companies Hiring</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topCompaniesData.map((company, index) => (
                    <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{company.name}</h3>
                            <div className="flex items-center mt-1">
                              <BriefcaseIcon className="h-4 w-4 text-muted-foreground mr-1" />
                              <span className="text-sm text-muted-foreground mr-2">{company.openings} openings</span>
                              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 rounded-full">
                                {company.growth}
                              </span>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs text-muted-foreground mb-1">Top roles:</p>
                              <div className="flex flex-wrap gap-1">
                                {company.topRoles.map((role, i) => (
                                  <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">
                                    {role}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-2">
                  View All Companies
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Latest Industry Reports</h2>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Download All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {industryReports.map((report, index) => (
                    <Card key={index} className="glass-card overflow-hidden hover-scale">
                      <div className="h-40 overflow-hidden">
                        <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{report.date}</p>
                        <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="link" className="text-green-600 p-0">
                          Read Report →
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Newsletter Signup */}
          <Card className="animate-on-scroll opacity-0 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-none p-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Get Market Trends Updates</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to receive monthly reports and alerts on emerging career opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Enter your email" className="sm:flex-grow" />
                <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                  Subscribe
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

export default MarketTrends;
