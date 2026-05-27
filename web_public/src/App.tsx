import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Context
import { useConfig } from './context/ConfigContext';
import { resolveAssetUrl } from './utils/asset.utils';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import PitchList from './pages/PitchList';
import PitchDetail from './pages/PitchDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const { config, loading, error, refresh } = useConfig();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setAssetsLoaded(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setAssetsLoaded(false);
    }
  }, [loading]);

  useEffect(() => {
    if (config?.HEADER_TITLE) {
      document.title = config.HEADER_TITLE;
    }
    if (config?.HEADER_LOGO) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = resolveAssetUrl(config.HEADER_LOGO);
    }
  }, [config?.HEADER_TITLE, config?.HEADER_LOGO]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isReady = !loading && assetsLoaded && !error && config;

  return (
    <div className="core-app">
      <AnimatePresence mode="wait">
        {!isReady ? (
          <LoadingScreen 
            key="loader" 
            config={config} 
            error={error} 
            onRetry={refresh} 
          />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Header config={config} />
            
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/san-the-thao" element={<PitchList />} />
              <Route path="/san-the-thao/:id" element={<PitchDetail />} />
              <Route path="/tai-khoan" element={<Dashboard />} />
              <Route path="/dang-nhap" element={<Login />} />
              <Route path="/dang-ky" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer config={config} />
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster position="top-right" />
      <style>{`
        .core-app {
          background-color: var(--background);
          color: var(--on-background);
          min-height: 100vh;
        }
        
        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
        
        section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </div>
  );
}

export default App;
