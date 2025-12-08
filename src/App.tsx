import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Timeline } from "./components/Timeline";
import { UI } from "./constants/UI_CONTENT";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import Projects from "./components/Projects";

function App() {
  const { navbar } = UI;
  
  useEffect(() => {
    const forceScrollToTop = () => {
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      window.scrollTo(0, 0);  
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
      
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = originalScrollBehavior || 'smooth';
      }, 200);
    };

    forceScrollToTop();
    
    requestAnimationFrame(() => {
      requestAnimationFrame(forceScrollToTop);
    });
    
    const delayedScroll = setTimeout(forceScrollToTop, 500);
    
    const handleFocus = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearTimeout(delayedScroll);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar template={navbar} />
      <main>
        <Home />
        <Timeline />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;