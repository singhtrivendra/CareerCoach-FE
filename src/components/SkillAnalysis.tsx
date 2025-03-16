
import { useState } from "react";
import { Check, AlertCircle, Search, BarChart3, PieChart, ChevronRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type SkillType = {
  name: string;
  level: number;
  industry: number;
  gap: number;
};

const mockSkills: SkillType[] = [
  { name: "JavaScript", level: 75, industry: 85, gap: 10 },
  { name: "React", level: 65, industry: 80, gap: 15 },
  { name: "UI/UX Design", level: 85, industry: 80, gap: 0 },
  { name: "Node.js", level: 60, industry: 75, gap: 15 },
  { name: "Data Analysis", level: 45, industry: 70, gap: 25 },
  { name: "Project Management", level: 80, industry: 75, gap: 0 },
  { name: "Communication", level: 90, industry: 85, gap: 0 },
  { name: "Python", level: 30, industry: 65, gap: 35 },
];

export default function SkillAnalysis() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const filteredSkills = mockSkills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gapSkills = mockSkills.filter(skill => skill.gap > 0);
  const strongSkills = mockSkills.filter(skill => skill.level >= 80);
  
  const getSkillColorClass = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    if (level >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: "Your skills report has been exported and is ready for download.",
    });
  };

  const handleUpdateSkills = () => {
    toast({
      title: "Skills updated",
      description: "Your skills have been updated based on your latest activities.",
    });
  };

  const handleViewFullPlan = () => {
    toast({
      title: "Generating your learning plan",
      description: "We're creating a personalized learning plan based on your skill gaps.",
    });
  };

  const handleRecommendationClick = (course: string) => {
    toast({
      title: "Course recommendation",
      description: `Opening recommended course: ${course}`,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card md:col-span-2 animate-blurry-reveal">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Skill Analysis</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <BarChart3 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <PieChart className="h-5 w-5" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Compare your skills with industry standards
            </CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search skills..."
                className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="all">All Skills</TabsTrigger>
                <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {filteredSkills.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Search className="h-10 w-10 text-muted-foreground mb-3 opacity-40" />
                    <p className="text-muted-foreground">No skills found matching your search</p>
                  </div>
                ) : (
                  filteredSkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.level} className={getSkillColorClass(skill.level)} />
                        <div 
                          className="absolute top-0 h-full w-px bg-foreground/30"
                          style={{ left: `${skill.industry}%` }}
                        />
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-muted-foreground">Your proficiency</span>
                        <Separator className="mx-2 h-4" orientation="vertical" />
                        <span className="text-muted-foreground">Industry standard: {skill.industry}%</span>
                        
                        {skill.gap > 0 && (
                          <>
                            <Separator className="mx-2 h-4" orientation="vertical" />
                            <span className="text-red-500 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Gap: {skill.gap}%
                            </span>
                          </>
                        )}
                        
                        {skill.level >= skill.industry && (
                          <>
                            <Separator className="mx-2 h-4" orientation="vertical" />
                            <span className="text-green-500 flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Above standard
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="gaps" className="space-y-6">
                {gapSkills.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Check className="h-10 w-10 text-green-500 mb-3" />
                    <p className="text-muted-foreground">No significant skill gaps found!</p>
                  </div>
                ) : (
                  gapSkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.level} className={getSkillColorClass(skill.level)} />
                        <div 
                          className="absolute top-0 h-full w-px bg-foreground/30"
                          style={{ left: `${skill.industry}%` }}
                        />
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-muted-foreground">Your proficiency</span>
                        <Separator className="mx-2 h-4" orientation="vertical" />
                        <span className="text-muted-foreground">Industry standard: {skill.industry}%</span>
                        <Separator className="mx-2 h-4" orientation="vertical" />
                        <span className="text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Gap: {skill.gap}%
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="strengths" className="space-y-6">
                {strongSkills.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <AlertCircle className="h-10 w-10 text-amber-500 mb-3" />
                    <p className="text-muted-foreground">No significant strengths found yet.</p>
                  </div>
                ) : (
                  strongSkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.level} className="bg-green-500" />
                        <div 
                          className="absolute top-0 h-full w-px bg-foreground/30"
                          style={{ left: `${skill.industry}%` }}
                        />
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-muted-foreground">Your proficiency</span>
                        <Separator className="mx-2 h-4" orientation="vertical" />
                        <span className="text-muted-foreground">Industry standard: {skill.industry}%</span>
                        <Separator className="mx-2 h-4" orientation="vertical" />
                        <span className="text-green-500 flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Above standard
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="mr-2" onClick={handleExportReport}>
              <FileDown className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={handleUpdateSkills} className="bg-green-600 hover:bg-green-700">
              Update Skills
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card className="glass-card animate-blurry-reveal">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Skill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Skill Level</span>
                  <span className="font-medium">
                    {Math.round(mockSkills.reduce((acc, skill) => acc + skill.level, 0) / mockSkills.length)}%
                  </span>
                </div>
                <Progress value={Math.round(mockSkills.reduce((acc, skill) => acc + skill.level, 0) / mockSkills.length)} />
              </div>
              
              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Key Insights</div>
                <ul className="space-y-2">
                  <li className="flex text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Strong in communication and project management</span>
                  </li>
                  <li className="flex text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Data analysis skills need improvement</span>
                  </li>
                  <li className="flex text-sm">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Python skills significantly below industry standards</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-blurry-reveal">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-between text-left font-normal"
                onClick={() => handleRecommendationClick("Python fundamentals")}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                    1
                  </div>
                  <span>Take Python fundamentals course</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-between text-left font-normal"
                onClick={() => handleRecommendationClick("Data analysis")}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                    2
                  </div>
                  <span>Improve data analysis skills</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-between text-left font-normal"
                onClick={() => handleRecommendationClick("React advanced")}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                    3
                  </div>
                  <span>Enhance React knowledge</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </Button>
              
              <div className="pt-2">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleViewFullPlan}>
                  View Full Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
