import React, { useState } from 'react';
import { resolveAssetUrl } from '../utils/asset.utils';

interface BaseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallback?: string;
}

const BaseImage: React.FC<BaseImageProps> = ({ src, fallback, alt, className, style, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = hasError ? (fallback || resolveAssetUrl(undefined)) : resolveAssetUrl(src);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }} className={className}>
      {isLoading && !hasError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--glass)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      )}
      <img
        src={resolvedSrc}
        alt={alt || 'Portfolio image'}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'all 0.4s ease',
          opacity: isLoading ? 0 : 1,
        }}
        {...props}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default BaseImage;
