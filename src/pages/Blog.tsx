
import { useState } from "react";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BookOpenText, Calendar, Heart, MessageCircle, Search, Share2, Tag, User } from "lucide-react";

// Sample blog data
const BLOG_POSTS = [
  {
    id: 1,
    title: "How AI is Revolutionizing Job Interviews",
    excerpt: "Discover how artificial intelligence is transforming the hiring process and how you can prepare for AI-powered interviews.",
    author: "Emily Johnson",
    date: "May 15, 2023",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1573164713499-f250ef4b6a68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    tags: ["AI", "Interviews", "Career"]
  },
  {
    id: 2,
    title: "5 Skills Every Professional Needs in 2023",
    excerpt: "The job market is evolving rapidly. Learn the 5 essential skills that will make you stand out in any industry this year.",
    author: "Michael Chen",
    date: "June 2, 2023",
    category: "Skills",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: ["Skills", "Professional Development", "Career Growth"]
  },
  {
    id: 3,
    title: "The Future of Remote Work: Trends and Predictions",
    excerpt: "Remote work is here to stay. Explore the latest trends and expert predictions on how remote work will evolve in the coming years.",
    author: "Sophia Rodriguez",
    date: "June 18, 2023",
    category: "Workplace",
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    tags: ["Remote Work", "Future of Work", "Workplace"]
  },
  {
    id: 4,
    title: "Building a Personal Brand That Gets You Noticed",
    excerpt: "Your personal brand can be your biggest career asset. Learn how to develop a compelling personal brand that attracts opportunities.",
    author: "David Washington",
    date: "July 5, 2023",
    category: "Personal Development",
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: ["Personal Brand", "Career Development", "Networking"]
  },
  {
    id: 5,
    title: "Mastering the Art of Salary Negotiation",
    excerpt: "Never settle for less than you deserve. Discover proven strategies for successful salary negotiations that can boost your income.",
    author: "Priya Patel",
    date: "July 22, 2023",
    category: "Career Advice",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    tags: ["Negotiation", "Salary", "Career Growth"]
  },
  {
    id: 6,
    title: "How to Ace Your Technical Interview",
    excerpt: "Technical interviews can be intimidating. Learn expert strategies to prepare and excel in your next technical interview.",
    author: "James Wilson",
    date: "August 10, 2023",
    category: "Interviews",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    tags: ["Technical Interview", "Coding", "Job Search"]
  }
];

const BlogFilterSidebar = () => {
  return (
    <Card className="h-full glass-card">
      <CardHeader>
        <CardTitle>Filter Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Search</h3>
          <div className="flex gap-2">
            <Input placeholder="Search posts..." />
            <Button size="icon" variant="outline"><Search className="h-4 w-4" /></Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Categories</h3>
          <ul className="space-y-1">
            {["All", "Technology", "Skills", "Workplace", "Personal Development", "Career Advice", "Interviews"].map(category => (
              <li key={category} className="flex items-center gap-2">
                <Button variant="ghost" className="justify-start h-8 px-2 w-full">
                  {category}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {["AI", "Career", "Skills", "Remote Work", "Interview", "Growth"].map(tag => (
              <Button key={tag} variant="outline" size="sm" className="h-7">
                <Tag className="h-3 w-3 mr-1" /> {tag}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BlogPost = ({ post }: { post: typeof BLOG_POSTS[0] }) => {
  return (
    <Card className="glass-card hover-scale overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center text-sm text-muted-foreground space-x-2 mb-1">
          <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full text-xs">
            {post.category}
          </span>
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {post.date}
          </span>
        </div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-3 w-3 mr-1" /> {post.author}
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FeaturedPost = () => {
  return (
    <Card className="glass-card overflow-hidden">
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
          alt="Featured Post" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm inline-block w-fit mb-3">
            Featured
          </span>
          <h2 className="text-white text-3xl font-bold mb-2">
            Navigating Career Transitions in a Post-Pandemic World
          </h2>
          <p className="text-white/80 mb-4">
            The pandemic has reshaped how we work and think about careers. Learn how to navigate the new landscape and find opportunities in change.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-2">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Alex Rivera</p>
                <p className="text-white/70 text-xs">August 15, 2023</p>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Read Article
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Blog = () => {
  const [currentTab, setCurrentTab] = useState("all");
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderWrapper />
      
      <main className="flex-grow px-4 py-10 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Career <span className="text-gradient-green">Insights</span> Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert articles, guides, and resources to accelerate your career growth and development.
            </p>
          </div>
          
          {/* Featured Post */}
          <FeaturedPost />
          
          {/* Content Tabs and Filter */}
          <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center">
                <BookOpenText className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">
                  {BLOG_POSTS.length} Articles Available
                </span>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogFilterSidebar />
              </div>
              
              {/* Blog Posts */}
              <div className="lg:col-span-3">
                <TabsContent value="all" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {BLOG_POSTS.map(post => (
                      <BlogPost key={post.id} post={post} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="popular" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {BLOG_POSTS.slice(0, 3).map(post => (
                      <BlogPost key={post.id} post={post} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="recent" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {BLOG_POSTS.slice(3, 6).map(post => (
                      <BlogPost key={post.id} post={post} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="trending" className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {BLOG_POSTS.slice(1, 4).map(post => (
                      <BlogPost key={post.id} post={post} />
                    ))}
                  </div>
                </TabsContent>
                
                {/* Pagination */}
                <div className="mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </Tabs>
          
          {/* Newsletter Signup */}
          <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-none p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-muted-foreground mb-4">
                  Get the latest career insights, tips, and trends delivered straight to your inbox. No spam, just valuable content.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input placeholder="Enter your email" type="email" className="flex-grow" />
                <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                  Subscribe Now
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

export default Blog;
