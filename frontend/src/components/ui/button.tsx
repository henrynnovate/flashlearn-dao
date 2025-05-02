import React from 'react';
import { motion, MotionProps } from 'framer-motion';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'> & 
  MotionProps & {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'outline';
    className?: string;
    leftIcon?: React.ReactNode;
  };

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  size = 'md',
  variant = 'solid',
  leftIcon,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold px-6 py-2 transition-all focus:outline-none';

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const variantClasses = {
    solid: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props as any} // Temporary type assertion
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </motion.button>
  );
};

export { Button };