
import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, ChevronRight, MessageCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type FeedbackType = {
  content: string;
  type: "positive" | "negative" | "suggestion";
};

type QuestionType = {
  id: number;
  content: string;
  context?: string;
};

const sampleQuestions: QuestionType[] = [
  {
    id: 1,
    content: "Tell me about yourself and your experience.",
    context: "This is an opener to learn about your professional background."
  },
  {
    id: 2,
    content: "What are your greatest strengths and how do they help you in your work?",
    context: "This question helps evaluate your self-awareness and how you apply your strengths."
  },
  {
    id: 3,
    content: "Describe a challenging project you worked on and how you overcame obstacles.",
    context: "This reveals your problem-solving abilities and resilience."
  },
  {
    id: 4,
    content: "Why are you interested in this role/industry?",
    context: "This helps assess your motivation and interest alignment."
  },
  {
    id: 5,
    content: "Where do you see yourself in 5 years?",
    context: "This explores your career planning and aspirations."
  }
];

export default function InterviewSimulator() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);
  const [interviewComplete, setInterviewComplete] = useState(false);
  
  const recordingTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentQuestion(sampleQuestions[questionIndex]);
  }, [questionIndex]);

  const startRecording = () => {
    // In a real app, we would implement actual audio recording here
    setIsRecording(true);
    recordingTimeRef.current = 0;
    timerRef.current = window.setInterval(() => {
      recordingTimeRef.current += 1;
    }, 1000);
    
    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone",
    });
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    
    // Simulate a recorded answer
    setIsAnalyzing(true);
    setTimeout(() => {
      // This would be where we'd send the audio to an AI service
      const simulatedAnswer = "In my previous role, I led a team of developers to redesign our company's entire e-commerce platform. The project had tight deadlines and we faced technical challenges with integrating legacy systems. I organized the team into focused sub-groups, established clear milestones, and implemented daily stand-ups to track progress and quickly address issues. We delivered the project on time and saw a 35% increase in conversion rates after launch.";
      setUserAnswer(simulatedAnswer);
      
      // Simulate AI analysis
      analyzeFeedback(simulatedAnswer);
    }, 2000);
  };

  const analyzeFeedback = (answer: string) => {
    // In a real app, this would be an API call to an AI service
    setTimeout(() => {
      // Simulated AI feedback
      const simulatedFeedback: FeedbackType[] = [
        {
          content: "Strong example of leadership and project management skills",
          type: "positive"
        },
        {
          content: "Good quantifiable result (35% increase in conversion)",
          type: "positive"
        },
        {
          content: "Consider adding more details about your personal contribution",
          type: "suggestion"
        },
        {
          content: "The answer lacks specific technologies or methods used",
          type: "negative"
        }
      ];
      
      setFeedback(simulatedFeedback);
      setIsAnalyzing(false);
    }, 1500);
  };

  const nextQuestion = () => {
    if (questionIndex < sampleQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setUserAnswer("");
      setFeedback([]);
    } else {
      setInterviewComplete(true);
    }
  };

  const restartInterview = () => {
    setQuestionIndex(0);
    setUserAnswer("");
    setFeedback([]);
    setInterviewComplete(false);
  };

  const renderFeedbackIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">+</div>;
      case "negative":
        return <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">-</div>;
      case "suggestion":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default:
        return null;
    }
  };

  if (interviewComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto animate-scale-in glass-card">
        <CardHeader>
          <CardTitle className="text-2xl">Interview Complete! 🎉</CardTitle>
          <CardDescription>
            You've successfully completed the mock interview session.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You answered all {sampleQuestions.length} questions in this interview.</p>
          <div className="p-6 bg-secondary/50 rounded-lg">
            <h3 className="font-medium mb-2">Overall Feedback:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mt-0.5">+</div>
                <span>You provided specific examples in most of your answers.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mt-0.5">+</div>
                <span>Your communication was clear and structured.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <span>Try to include more quantifiable achievements in future interviews.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <span>Prepare more examples showing your problem-solving process.</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button onClick={restartInterview} variant="outline">
            Start New Interview
          </Button>
          <Button>
            View Detailed Analysis
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto grid md:grid-cols-5 gap-6">
      <Card className="md:col-span-3 glass-card animate-blurry-reveal">
        <CardHeader>
          <div className="text-sm font-medium text-muted-foreground">
            Question {questionIndex + 1} of {sampleQuestions.length}
          </div>
          <CardTitle className="text-xl mt-2">{currentQuestion?.content}</CardTitle>
          {currentQuestion?.context && (
            <CardDescription>{currentQuestion.context}</CardDescription>
          )}
        </CardHeader>
        
        <CardContent>
          {userAnswer ? (
            <div className="bg-secondary/40 p-4 rounded-lg">
              <p className="text-foreground/90">{userAnswer}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-secondary/40 rounded-lg">
              {isRecording ? (
                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>
                    <div className="relative rounded-full bg-red-500 p-3">
                      <Mic className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">Recording... Speak your answer</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p>Click the button below to start recording your answer</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {!userAnswer ? (
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "default"}
              className="w-full"
            >
              {isRecording ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="w-full">
              Next Question <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card className="md:col-span-2 glass-card animate-blurry-reveal">
        <CardHeader>
          <CardTitle className="text-lg">AI Feedback</CardTitle>
          <CardDescription>
            Real-time analysis of your response
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-60">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Analyzing your response...</p>
            </div>
          ) : feedback.length > 0 ? (
            <ul className="space-y-3">
              {feedback.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  {renderFeedbackIcon(item.type)}
                  <span className="text-sm">{item.content}</span>
                </li>
              ))}
            </ul>
          ) : !userAnswer ? (
            <div className="flex flex-col items-center justify-center h-60 text-center text-muted-foreground">
              <p>Feedback will appear here after you answer the question</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-center text-muted-foreground">
              <p>No feedback available yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
