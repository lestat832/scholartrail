import React from 'react';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  colorScheme?: 'default' | 'monochrome' | 'white';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 'md', 
  colorScheme = 'default',
  className = '' 
}) => {
  // Size mappings
  const sizeMap = {
    sm: 120,
    md: 180,
    lg: 240,
    xl: 300,
  };
  
  const width = typeof size === 'number' ? size : sizeMap[size];
  const iconSize = variant === 'horizontal' ? width * 0.3 : width * 0.5;
  
  // Color schemes
  const colors = {
    default: {
      book: '#45818E', // Privacy Teal
      star: '#FFB700', // Bright Gold
      text: '#34495E', // Vault Blue
    },
    monochrome: {
      book: '#34495E',
      star: '#34495E',
      text: '#34495E',
    },
    white: {
      book: '#FFFFFF',
      star: '#FFFFFF',
      text: '#FFFFFF',
    },
  };
  
  const currentColors = colors[colorScheme];
  
  const BookIcon = ({ size: iconWidth }: { size: number }) => (
    <svg 
      width={iconWidth} 
      height={iconWidth} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Book Shape */}
      <path
        d="M20 15 C20 10, 25 10, 30 10 L70 10 C75 10, 80 10, 80 15 L80 75 C80 80, 75 80, 70 80 L30 80 C25 80, 20 80, 20 75 Z"
        fill={currentColors.book}
      />
      
      {/* Book Spine */}
      <rect x="25" y="10" width="5" height="70" fill={currentColors.book} opacity="0.8" />
      
      {/* S-curved Path */}
      <path
        d="M40 60 Q50 50, 45 40 T50 20"
        stroke={colorScheme === 'white' ? '#34495E' : 'white'}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Star */}
      <g transform="translate(50, 20)">
        <path
          d="M0 -10 L2.35 -3.09 L9.51 -3.09 L3.58 1.18 L5.93 8.09 L0 3.82 L-5.93 8.09 L-3.58 1.18 L-9.51 -3.09 L-2.35 -3.09 Z"
          fill={currentColors.star}
        />
      </g>
      
      {/* Subtle shadow for depth */}
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.2"/>
        </filter>
      </defs>
    </svg>
  );
  
  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex ${className}`}>
        <BookIcon size={iconSize} />
      </div>
    );
  }
  
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <BookIcon size={iconSize} />
        <span 
          className="font-bold"
          style={{ 
            fontSize: `${iconSize * 0.7}px`,
            color: currentColors.text,
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '-0.02em'
          }}
        >
          ScholarTrail
        </span>
      </div>
    );
  }
  
  // Default 'full' variant
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <BookIcon size={iconSize} />
      <span 
        className="font-bold mt-2"
        style={{ 
          fontSize: `${iconSize * 0.35}px`,
          color: currentColors.text,
          fontFamily: 'Playfair Display, serif',
          letterSpacing: '-0.02em'
        }}
      >
        ScholarTrail
      </span>
    </div>
  );
};

export default Logo;