import { useState, useEffect } from 'react';
import { getPageConfig } from './api/api';
import { resolveAssetUrl } from './utils/asset.utils';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';


function App() {
  const location = useLocation();
  const [data, setData] = useState<{
    config: any;
    loading: boolean;
  }>({
    config: null,
    loading: true,
  });

  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setData(prev => ({ ...prev, loading: true }));
    setAssetsLoaded(false);
    setError(false);

    try {
      const config = await getPageConfig();

      // Strict validation: Ensure config has actual data
      if (!config || (Array.isArray(config) && config.length === 0)) {
        throw new Error('Critical data is missing or empty');
      }

      // Preload Hero Image if available
      const heroImgKey = 'HOME_HERO_IMG';
      const heroImgUrl = config.find((c: any) => c.key === heroImgKey)?.value || 'src/assets/hero-visual.png';
      
      const preloadImage = (url: string) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = resolveAssetUrl(url);
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails, but at least we tried
        });
      };

      await preloadImage(heroImgUrl);

      // Add a small artificial delay for smoother visual experience
      await new Promise(resolve => setTimeout(resolve, 800));

      setData({
        config,
        loading: false,
      });
      setAssetsLoaded(true);
      setError(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      // Keep loading as true but set error, so LoadingScreen can show Error UI
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.config) {
      const title = data.config.find((c: any) => c.key === 'HEADER_TITLE')?.value;
      const logo = data.config.find((c: any) => c.key === 'HEADER_LOGO')?.value;
      
      if (title) {
        document.title = title;
      }
      
      if (logo) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = resolveAssetUrl(logo);
      }
    }
  }, [data.config]);

  // Combined readiness check: Must have data, assets loaded, and NO error
  const isReady = !data.loading && assetsLoaded && !error && data.config;

  return (
    <div className="core-app">
      <AnimatePresence mode="wait">
        {!isReady ? (
          <LoadingScreen 
            key="loader" 
            config={data.config} 
            error={error} 
            onRetry={fetchData} 
          />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Header config={data.config} />
            
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home config={data.config} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer config={data.config} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .core-app {
          background-color: var(--bg);
          color: var(--text);
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

