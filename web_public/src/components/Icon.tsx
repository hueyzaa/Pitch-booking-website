import React from 'react';

interface IconProps {
  name: string;
  filled?: boolean;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ name, filled = false, size = 24, className = '', style }) => {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`}
      style={{
        fontSize: `${size}px`,
        ...style,
      }}
    >
      {name}
    </span>
  );
};

export default Icon;
