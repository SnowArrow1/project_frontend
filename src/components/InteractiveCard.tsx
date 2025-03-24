// src/components/InteractiveCard.tsx
'use client';

import React, { useState } from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardClasses = `
    ${isHovered ? 'shadow-2xl bg-neutral-200' : 'shadow-lg bg-white'} 
    rounded-lg 
    transition-all 
    duration-300
  `;

  return (
    <div 
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;
