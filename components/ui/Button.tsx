import { forwardRef, cloneElement, isValidElement } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'base' | 'lg' | 'md';
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const baseStyles =
  'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const variants = {
  primary:
    'bg-accent text-black hover:bg-accent-hover hover:shadow-glow hover:scale-[1.02] shadow-soft',
  secondary:
    'border border-border-strong bg-transparent text-text-primary hover:bg-surface-elevated/50',
};

const sizes = {
  base: 'px-6 py-3 text-base',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 sm:px-10 py-4 sm:py-5 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'base',
      asChild,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: [classes, (children as React.ReactElement).props.className].filter(Boolean).join(' '),
      });
    }
    return (
      <button
        type="button"
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
