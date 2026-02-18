import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section';
}

export function Card({ children, className = '', as: Component = 'div' }: CardProps) {
  return (
    <Component
      className={`bg-surface border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-soft ${className}`}
    >
      {children}
    </Component>
  );
}

interface CardIconProps {
  icon: ReactNode;
  className?: string;
}

export function CardIcon({ icon, className = '' }: CardIconProps) {
  return (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-accent [&_svg]:w-6 [&_svg]:h-6 sm:[&_svg]:w-8 sm:[&_svg]:h-8 ${className}`}
      aria-hidden
    >
      {icon}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function CardTitle({ children, as: Tag = 'h3', className = '' }: CardTitleProps) {
  return (
    <Tag className={`font-bold text-lg sm:text-xl text-text-primary mt-4 ${className}`}>
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-text-secondary text-base sm:text-lg leading-relaxed mt-2 ${className}`}>
      {children}
    </p>
  );
}
