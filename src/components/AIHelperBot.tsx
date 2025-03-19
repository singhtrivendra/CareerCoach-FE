import { useState, useEffect, useRef } from 'react';
import { Bot, MessageCircle, X, HelpCircle, HandHelping, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
console.log(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function AIHelperBot() {


  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "👋 Hi there! I'm your AI career assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [hover, setHover] = useState(false);
  const [walkCycle, setWalkCycle] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [actionTimeout, setActionTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const animationRef = useRef<number>();
  const botRef = useRef<HTMLDivElement>(null);

  // Initialize bot
  useEffect(() => {
    const showTimeout = setTimeout(() => setIsVisible(true), 1500);
    return () => {
      clearTimeout(showTimeout);
    };
  }, []);

  // Schedule random animations
  useEffect(() => {
    if (isOpen) return;
    
    const scheduleRandomAction = () => {
      // Clear any existing timeout
      if (actionTimeout) {
        clearTimeout(actionTimeout);
      }
      
      // Schedule a new random action
      const newTimeout = setTimeout(() => {
        const randomAction = Math.random();
        
        if (randomAction < 0.3) {
          // Start dancing for 3 seconds
          setIsDancing(true);
          setTimeout(() => setIsDancing(false), 3000);
        } else if (randomAction < 0.5) {
          // Do a flip
          setIsFlipping(true);
          setTimeout(() => setIsFlipping(false), 1000);
        }
        
        // Schedule the next action
        scheduleRandomAction();
      }, Math.random() * 8000 + 5000); // Random time between 5-13 seconds
      
      setActionTimeout(newTimeout);
    };
    
    scheduleRandomAction();
    
    return () => {
      if (actionTimeout) {
        clearTimeout(actionTimeout);
      }
    };
  }, [isOpen]);

  // Bot animation
  useEffect(() => {
    if (isOpen) return;

    const animateBot = () => {
      const time = Date.now() / 1000;
      
      // Floating and bobbing effect
      setRotation(Math.sin(time * 0.5) * 5);
      setScale(1 + Math.sin(time * 1.2) * 0.05);
      
      // Walking cycle animation (legs and arms movement)
      setWalkCycle(prev => (prev + 0.1) % (2 * Math.PI));
      
      animationRef.current = requestAnimationFrame(animateBot);
    };
    
    animationRef.current = requestAnimationFrame(animateBot);
      
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!inputValue.trim()) return;
  
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
  
    try {
      const result = await model.generateContent(inputValue);
      const response = result.response.text();
      console.log(response)
  
      // Add bot's response
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process that. Please try again.", sender: 'bot' }]);
    }
  
    setInputValue('');
  };  

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isVisible) return null;

  // Helper function to calculate the leg or arm position based on walk cycle
  const getLimbPosition = (phase: number) => Math.sin(walkCycle + phase);

  return (
    <div className="fixed z-50 bottom-10 right-10">
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-xl animate-scale-in border border-green-200 dark:border-green-800">
          <div className="bg-gradient-to-r from-green-600 to-teal-500 p-3 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-1.5 mr-2">
                <Bot className="h-5 w-5" />
              </div>
              <span className="font-medium">AI Career Coach</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-7 w-7 text-white hover:bg-white/20 rounded-full p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="p-0">
            <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3 bg-background">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`${msg.sender === 'bot' 
                    ? 'bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 text-green-800 dark:text-green-200 self-start' 
                    : 'bg-primary/10 self-end'} 
                    max-w-[80%] rounded-2xl p-3 shadow-sm animate-fade-in`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="border-t p-3 flex">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 p-2 bg-background border rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Button type="submit" className="rounded-l-none bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600">
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div 
          ref={botRef}
          className="relative cursor-pointer group"
          onClick={toggleChat}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            transform: `rotate(${isFlipping ? '360deg' : rotation + 'deg'}) scale(${scale})`,
            transition: isFlipping ? 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.05s linear'
          }}
        >
          {/* Help text bubble */}
          <div 
            className={`absolute -top-16 right-0 bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 px-4 py-2 rounded-full shadow-lg whitespace-nowrap text-sm font-medium
              ${hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all duration-300`}
          >
            How can I help you? 
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45"></div>
          </div>
          
          {/* 3D Bot Character with head, body, arms and legs */}
          <div 
            className={`h-24 w-20 relative group-hover:scale-110 transition-transform duration-300
              ${isDancing ? 'animate-bounce' : ''}`}
          >
            {/* Glow effect behind bot */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300/30 to-teal-300/30 blur-xl animate-pulse-slow"></div>
            
            {/* Bot Head - larger and more prominent */}
            <div className="absolute w-14 h-14 top-0 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-green-400 to-teal-500 shadow-lg">
              {/* Bot face */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Eyes */}
                  <div className="absolute w-2.5 h-2.5 bg-white rounded-full top-4 left-3"></div>
                  <div className="absolute w-2.5 h-2.5 bg-white rounded-full top-4 right-3"></div>
                  
                  {/* Mouth - digital smile */}
                  <div className="absolute w-6 h-1.5 bg-white/90 rounded-full bottom-3 left-1/2 -translate-x-1/2"></div>
                  
                  {/* Antenna */}
                  <div className="absolute w-1 h-3 bg-gradient-to-t from-green-400 to-blue-400 top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 rounded-full">
                    <div className="absolute w-2 h-2 rounded-full bg-blue-400 top-0 left-1/2 -translate-x-1/2 -translate-y-1 animate-pulse-slow"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bot Body */}
            <div className="absolute w-12 h-12 rounded-t-lg bg-gradient-to-br from-teal-500 to-green-600 top-12 left-1/2 -translate-x-1/2 shadow-md">
              {/* Body details - control panel */}
              <div className="absolute w-6 h-4 bg-gray-800/30 rounded-md top-2 left-1/2 -translate-x-1/2 flex items-center justify-around">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
            {/* Left Arm */}
            <div className="absolute w-3 h-10 bg-teal-500 rounded-full top-14 left-1" 
              style={{ 
                transform: `rotate(${isDancing ? Math.sin(Date.now() / 200) * 45 : getLimbPosition(0) * 20}deg)`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-out'
              }}
            >
              {/* Left Hand */}
              <div className="absolute w-4 h-4 bg-teal-400 rounded-full -bottom-1 left-1/2 -translate-x-1/2 border-2 border-teal-600/30"></div>
            </div>
            
            {/* Right Arm - raised and waving */}
            <div className="absolute w-3 h-10 bg-teal-500 rounded-full top-14 right-1" 
              style={{ 
                transform: `rotate(${isDancing ? Math.sin(Date.now() / 200 + Math.PI) * 45 : -30 + Math.sin(Date.now() / 300) * 20}deg)`,
                transformOrigin: 'top center',
              }}
            >
              {/* Right Hand - waving */}
              <div className="absolute w-4 h-4 bg-teal-400 rounded-full -bottom-1 left-1/2 -translate-x-1/2 border-2 border-teal-600/30"
                style={{ 
                  animation: 'wave 2s infinite'
                }}
              ></div>
            </div>
            
            {/* Left Leg */}
            <div className="absolute w-3 h-8 bg-green-600 rounded-full bottom-0 left-4" 
              style={{ 
                transform: `rotate(${isDancing ? Math.sin(Date.now() / 150) * 30 : getLimbPosition(0) * 15}deg)`,
                transformOrigin: 'top center'
              }}
            >
              {/* Left Foot */}
              <div className="absolute w-5 h-2.5 bg-green-700 rounded-full -bottom-1 left-1/2 -translate-x-1/2 border-2 border-green-800/30"></div>
            </div>
            
            {/* Right Leg */}
            <div className="absolute w-3 h-8 bg-green-600 rounded-full bottom-0 right-4" 
              style={{ 
                transform: `rotate(${isDancing ? Math.sin(Date.now() / 150 + Math.PI) * 30 : getLimbPosition(Math.PI) * 15}deg)`,
                transformOrigin: 'top center'
              }}
            >
              {/* Right Foot */}
              <div className="absolute w-5 h-2.5 bg-green-700 rounded-full -bottom-1 left-1/2 -translate-x-1/2 border-2 border-green-800/30"></div>
            </div>
            
            {/* Notification dot */}
            <span className="absolute -top-1 right-0 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full border border-white/50 shadow-lg">1</span>
            
            {/* Sparkle effects */}
            <div className="absolute -top-2 -left-2 animate-pulse-slow opacity-80">
              <Sparkles className="h-5 w-5 text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]" />
            </div>
            <div className="absolute -bottom-1 -right-1 animate-pulse-slow opacity-80" style={{ animationDelay: '0.5s' }}>
              <Sparkles className="h-4 w-4 text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
