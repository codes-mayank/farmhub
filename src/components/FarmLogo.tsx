import React from 'react';

interface FarmLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
}

export const FarmLogo: React.FC<FarmLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const heightClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <img 
        src="/assets/fh_logo_2.png" 
        alt="FarmHub Logo" 
        className={`object-contain w-auto ${heightClasses[size]} filter drop-shadow-md transition-all duration-300`}
      />
    </div>
  );
};

