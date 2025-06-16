import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "./AuthDialog";
import { 
  Home, 
  Globe, 
  Rocket, 
  Radiation, 
  LogOut, 
  LogIn, 
  Sparkles 
} from 'lucide-react';

const Navigation = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleScrollToSection = (sectionId) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    // If we're already on the home page, just scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navLinks = [
    { 
      name: "Home", 
      href: "/", 
      icon: Home 
    },
    { 
      name: "Topics", 
      href: "/topics", 
      icon: Globe 
    },
    { 
      name: "Military", 
      href: "#military", 
      icon: Rocket,
      onClick: () => handleScrollToSection('military')
    },
    { 
      name: "Nuclear", 
      href: "#nuclear", 
      icon: Radiation,
      onClick: () => handleScrollToSection('nuclear')
    },
    { 
      name: "Peace", 
      href: "#peace", 
      icon: Sparkles,
      onClick: () => handleScrollToSection('peace')
    }
  ];

  return (
    <nav 
      className="
        fixed top-0 w-full 
        bg-gradient-to-r 
        from-zinc-950/95 
        via-red-950/80 
        to-zinc-950/95 
        backdrop-blur-xl 
        border-b 
        border-red-900/30 
        z-50
        shadow-2xl
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Animated Gradient */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link 
              to="/" 
              className="
                text-3xl font-bold 
                bg-gradient-to-r 
                from-red-500 
                via-red-400 
                to-orange-500 
                text-transparent 
                bg-clip-text
                hover:from-orange-500 
                hover:via-red-500 
                hover:to-red-600
                transition-all
                duration-300
              "
            >
              ARMWATCH
            </Link>
          </motion.div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                      setActiveLink(link.name);
                    }}
                    className={`
                      flex items-center gap-2 
                      text-white 
                      hover:text-red-400 
                      transition-all 
                      duration-300 
                      group
                      relative
                      ${activeLink === link.name 
                        ? 'text-red-500' 
                        : 'text-white/80 hover:text-red-300'}
                    `}
                  >
                    {link.icon && (
                      <link.icon 
                        className="
                          w-5 h-5 
                          text-white/60 
                          group-hover:text-red-400 
                          transition-colors
                        " 
                      />
                    )}
                    {link.name}
                    {activeLink === link.name && (
                      <motion.span 
                        layoutId="underline"
                        className="
                          absolute 
                          -bottom-2 
                          left-0 
                          right-0 
                          h-0.5 
                          bg-gradient-to-r 
                          from-red-500 
                          to-orange-500
                        "
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Authentication Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-white/80">
                  Welcome, {currentUser.email.split('@')[0]}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="
                    bg-gradient-to-r 
                    from-red-600/80 
                    to-orange-600/80 
                    text-white 
                    hover:from-red-700 
                    hover:to-orange-700 
                    border-none
                    flex items-center gap-2
                  "
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsAuthOpen(true)}
                variant="outline"
                className="
                  bg-gradient-to-r 
                  from-red-600/80 
                  to-orange-600/80 
                  text-white 
                  hover:from-red-700 
                  hover:to-orange-700 
                  border-none
                  flex items-center gap-2
                "
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </motion.div>
        </div>
      </div>
      
      <AuthDialog isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </nav>
  );
};

export default Navigation;