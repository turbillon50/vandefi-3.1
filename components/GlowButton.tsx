'use client';

import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0B0F] cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-500 hover:to-blue-400 focus:ring-purple-500 shadow-lg hover:shadow-purple-500/25 hover:shadow-xl active:scale-95',
    secondary:
      'bg-[#1E2030] text-[#F8FAFC] border border-[#2A2D45] hover:bg-[#252840] hover:border-purple-500/30 focus:ring-purple-500 active:scale-95',
    outline:
      'bg-transparent border border-[#7C3AED] text-[#7C3AED] hover:bg-purple-600/10 focus:ring-purple-500 active:scale-95',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E2030] focus:ring-[#1E2030] active:scale-95',
    danger:
      'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 focus:ring-red-500 shadow-lg hover:shadow-red-500/25 hover:shadow-xl active:scale-95',
  };

  const disabledStyles =
    'opacity-40 cursor-not-allowed pointer-events-none';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled ? disabledStyles : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
};

export default GlowButton;
