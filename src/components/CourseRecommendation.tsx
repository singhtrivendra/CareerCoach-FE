
import { useState } from "react";
import { Star, ExternalLink, Bookmark, BookmarkCheck, Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type CourseType = {
  id: number;
  title: string;
  provider: "udemy" | "coursera" | "mit" | "other";
  rating: number;
  reviewCount: number;
  category: string[];
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  price: number | "Free";
  matchScore: number;
  image: string;
  saved: boolean;
};

const mockCourses: CourseType[] = [
  {
    id: 1,
    title: "Python for Data Science and Machine Learning",
    provider: "udemy",
    rating: 4.7,
    reviewCount: 12463,
    category: ["Python", "Data Science", "Machine Learning"],
    level: "intermediate",
    duration: "42 hours",
    price: 89.99,
    matchScore: 95,
    image: "https://source.unsplash.com/random/400x300/?python",
    saved: false,
  },
  {
    id: 2,
    title: "React - The Complete Guide",
    provider: "udemy",
    rating: 4.8,
    reviewCount: 22891,
    category: ["JavaScript", "React", "Web Development"],
    level: "beginner",
    duration: "48 hours",
    price: 99.99,
    matchScore: 92,
    image: "https://source.unsplash.com/random/400x300/?javascript",
    saved: true,
  },
  {
    id: 3,
    title: "Google Data Analytics Professional Certificate",
    provider: "coursera",
    rating: 4.8,
    reviewCount: 56790,
    category: ["Data Analytics", "SQL", "Tableau"],
    level: "beginner",
    duration: "6 months",
    price: "Free",
    matchScore: 88,
    image: "https://source.unsplash.com/random/400x300/?data",
    saved: false,
  },
  {
    id: 4,
    title: "MIT Introduction to Deep Learning",
    provider: "mit",
    rating: 4.9,
    reviewCount: 7890,
    category: ["Deep Learning", "Python", "AI"],
    level: "advanced",
    duration: "10 weeks",
    price: "Free",
    matchScore: 85,
    image: "https://source.unsplash.com/random/400x300/?ai",
    saved: false,
  },
  {
    id: 5,
    title: "UI/UX Design Specialization",
    provider: "coursera",
    rating: 4.6,
    reviewCount: 9234,
    category: ["UI Design", "UX Design", "Figma"],
    level: "intermediate",
    duration: "3 months",
    price: "Free",
    matchScore: 80,
    image: "https://source.unsplash.com/random/400x300/?design",
    saved: true,
  },
  {
    id: 6,
    title: "Node.js: The Complete Guide",
    provider: "udemy",
    rating: 4.7,
    reviewCount: 14567,
    category: ["JavaScript", "Node.js", "Backend"],
    level: "intermediate",
    duration: "36 hours",
    price: 79.99,
    matchScore: 78,
    image: "https://source.unsplash.com/random/400x300/?code",
    saved: false,
  }
];

export default function CourseRecommendation() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"match" | "rating" | "price">("match");
  const { toast } = useToast();

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "match") return b.matchScore - a.matchScore;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price") {
      if (a.price === "Free") return -1;
      if (b.price === "Free") return 1;
      return (a.price as number) - (b.price as number);
    }
    return 0;
  });

  const savedCourses = courses.filter(course => course.saved);

  const toggleSaved = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, saved: !course.saved } 
        : course
    ));
    
    const course = courses.find(c => c.id === courseId);
    if (course) {
      toast({
        title: course.saved ? "Course removed from saved" : "Course saved",
        description: course.saved ? "You can always add it back later" : "You can find this in your saved courses",
      });
    }
  };

  const getProviderLogo = (provider: string) => {
    switch (provider) {
      case "udemy":
        return "Udemy";
      case "coursera":
        return "Coursera";
      case "mit":
        return "MIT";
      default:
        return provider;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "beginner":
        return <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">Beginner</Badge>;
      case "intermediate":
        return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">Intermediate</Badge>;
      case "advanced":
        return <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800">Advanced</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <Card className="glass-card animate-blurry-reveal">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Course Recommendations</CardTitle>
                <CardDescription>
                  Personalized courses based on your skill gaps and career path
                </CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-10 w-full sm:w-60 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => {
                      setSortBy(sortBy === "match" ? "rating" : sortBy === "rating" ? "price" : "match");
                    }}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span>
                      {sortBy === "match" ? "Match" : sortBy === "rating" ? "Rating" : "Price"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="recommended">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="saved">Saved Courses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommended">
                {sortedCourses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
                    <h3 className="text-lg font-medium mb-1">No courses found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCourses.map((course) => (
                      <Card key={course.id} className="relative overflow-hidden hover-scale group h-full">
                        <div className="absolute top-3 right-3 z-10">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={() => toggleSaved(course.id)}
                          >
                            {course.saved ? (
                              <BookmarkCheck className="h-5 w-5 text-primary" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-primary/90 backdrop-blur-sm">
                              {course.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        
                        <CardContent className="pt-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {getProviderLogo(course.provider)}
                            </span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                              <span className="text-sm font-medium">{course.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold mb-2 line-clamp-2 h-12">{course.title}</h3>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {course.category.slice(0, 3).map((cat, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {getLevelBadge(course.level)}
                              <span className="text-muted-foreground">{course.duration}</span>
                            </div>
                            
                            <span className="font-medium">
                              {course.price === "Free" ? "Free" : `$${course.price}`}
                            </span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-0">
                          <Button variant="default" className="w-full mt-3">
                            View Course <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved">
                {savedCourses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Bookmark className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
                    <h3 className="text-lg font-medium mb-1">No saved courses yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Bookmark courses that interest you to find them here
                    </p>
                    <Button variant="outline">
                      Browse Recommended Courses
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedCourses.map((course) => (
                      <Card key={course.id} className="relative overflow-hidden hover-scale group h-full">
                        <div className="absolute top-3 right-3 z-10">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={() => toggleSaved(course.id)}
                          >
                            <BookmarkCheck className="h-5 w-5 text-primary" />
                          </Button>
                        </div>
                        
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-primary/90 backdrop-blur-sm">
                              {course.matchScore}% Match
                            </Badge>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        
                        <CardContent className="pt-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {getProviderLogo(course.provider)}
                            </span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                              <span className="text-sm font-medium">{course.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold mb-2 line-clamp-2 h-12">{course.title}</h3>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {course.category.slice(0, 3).map((cat, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {getLevelBadge(course.level)}
                              <span className="text-muted-foreground">{course.duration}</span>
                            </div>
                            
                            <span className="font-medium">
                              {course.price === "Free" ? "Free" : `$${course.price}`}
                            </span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-0">
                          <Button variant="default" className="w-full mt-3">
                            View Course <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
