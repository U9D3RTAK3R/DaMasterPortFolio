import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export const AnimatedSection = ({ 
  children, 
  className = '', 
  animationType = 'slide-up',
  delay = 0,
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.15 });

  const getAnimationClass = () => {
    switch (animationType) {
      case 'slide-up':
        return 'opacity-0 translate-y-8';
      case 'slide-left':
        return 'opacity-0 translate-x-8';
      case 'slide-right':
        return 'opacity-0 -translate-x-8';
      case 'scale-in':
        return 'opacity-0 scale-95';
      case 'fade-in':
        return 'opacity-0';
      case 'bounce-in':
        return 'opacity-0 scale-90 translate-y-4';
      default:
        return 'opacity-0 translate-y-8';
    }
  };

  const getVisibleClass = () => {
    switch (animationType) {
      case 'slide-up':
        return 'opacity-100 translate-y-0';
      case 'slide-left':
        return 'opacity-100 translate-x-0';
      case 'slide-right':
        return 'opacity-100 translate-x-0';
      case 'scale-in':
        return 'opacity-100 scale-100';
      case 'fade-in':
        return 'opacity-100';
      case 'bounce-in':
        return 'opacity-100 scale-100 translate-y-0';
      default:
        return 'opacity-100 translate-y-0';
    }
  };

  const transitionClass = animationType === 'bounce-in' 
    ? 'transition-all duration-700 cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    : 'transition-all duration-700 ease-out';

  return (
    <div
      ref={ref}
      className={cn(
        transitionClass,
        !isVisible ? getAnimationClass() : getVisibleClass(),
        className
      )}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms' 
      }}
      {...props}
    >
      {children}
    </div>
  );
};