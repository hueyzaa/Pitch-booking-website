import { motion } from 'framer-motion';
import BackgroundGradient from './BackgroundGradient';
import { resolveAssetUrl } from '../utils/asset.utils';

interface HeroProps {
  config?: any[];
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  // Extract configuration values with defaults
  const configMap: Record<string, string> = config?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}) || {};
  
  const badgeText = configMap['HOME_HERO_BADGE'] || 'Modern Web App';
  const titleMain = configMap['HOME_HERO_TITLE_MAIN'] || 'Stunning';
  const titleAccent = configMap['HOME_HERO_TITLE_ACCENT'] || 'Digital';
  const titleSuffix = configMap['HOME_HERO_TITLE_SUFFIX'] || 'Solutions';
  const subtext = configMap['HOME_HERO_DESC'] || 'Crafting premium, scalable web solutions that deliver exceptional user experiences and modern aesthetics.';
  const heroImage = configMap['HOME_HERO_IMG'] || 'src/assets/hero-visual.png';


  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '8rem 2rem 4rem 2rem',
      textAlign: 'center',
    }}>
      <BackgroundGradient />

      <div className="container" style={{ 
        zIndex: 1, 
        display: 'grid', 
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
        gap: '5vw',
        alignItems: 'center',
        flex: 1,
        width: '100%',
      }}>
        {/* Left Side: Content */}
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 1.25rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '100px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2.5rem',
              gap: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF4500' }} />
            {badgeText}
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)', 
              fontWeight: 800, 
              lineHeight: 1,
              letterSpacing: '-0.05em',
              color: 'white',
              maxWidth: '100%',
              marginBottom: '2rem',
              textTransform: 'uppercase'
            }}
          >
            {titleMain} <br />
            <span className="text-editorial" style={{ 
              color: '#FF4500', 
              fontSize: '1.1em',
              textTransform: 'none',
              marginLeft: '-0.1em'
            }}>{titleAccent}</span> <br /> 
            {titleSuffix}
          </motion.h1>

          {/* Subtext */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '3.5rem',
              maxWidth: '550px',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
            dangerouslySetInnerHTML={{ __html: subtext }}
          />

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '1.25rem' }}
          >
            <a href="#about" className="btn btn-primary" style={{ minWidth: '180px', borderRadius: '2rem' }}>
              Get Started Now
            </a>
            <a href="#about" className="btn btn-secondary" style={{ minWidth: '180px', borderRadius: '2rem', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.03)' }}>
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Right Side: Visual */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
           style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '2.5rem',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)',
            position: 'relative',
            zIndex: 2
          }}>
            <img 
              src={resolveAssetUrl(heroImage)} 
              alt="Digital Experience Visual" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Glossy Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }} />
          </div>
          
          {/* Decorative Glow behind the image */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(255, 69, 0, 0.1) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />
        </motion.div>
      </div>

      {/* Decorative Gradient Overlay at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '15vh',
        background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />
    </section>
  );
};

export default Hero;

