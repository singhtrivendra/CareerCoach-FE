
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/20 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-gradient">
              CareerCoach
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Advanced AI-powered career coaching, personalized skill development, 
              and interview preparation to help you excel in your professional journey.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://x.com/SinghTrivendra7" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/trivendra-singh-919bb6255/" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/singhtrivendra" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Features
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/interview" className="text-muted-foreground hover:text-primary transition-colors">
                  Interview Simulator
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills Analysis
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Course Recommendations
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Market Trends
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} CareerCoach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
