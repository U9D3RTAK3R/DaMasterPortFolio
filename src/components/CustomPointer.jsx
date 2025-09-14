import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const CustomPointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Always enable custom pointer on desktop - ignore touch detection for now
    const isDesktop = window.innerWidth >= 768; // Consider desktop if screen width >= 768px
    
    setIsTouchDevice(!isDesktop); // Force desktop mode for wider screens
    
    // Force show pointer immediately
    setIsVisible(true);

    // Hide default cursor immediately
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
    // Apply to all elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      if (!isTouchDevice) {
        setIsClicking(true);
      }
    };

    const handleMouseUp = () => {
      if (!isTouchDevice) {
        setIsClicking(false);
      }
    };

    const handleMouseEnter = () => {
      if (!isTouchDevice) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isTouchDevice) {
        setIsVisible(false);
      }
    };

    const handleMouseOver = (e) => {
      if (!isTouchDevice) {
        const target = e.target;
        const isClickable = target.tagName === 'A' || 
                          target.tagName === 'BUTTON' || 
                          target.onclick !== null ||
                          target.style.cursor === 'pointer' ||
                          target.classList.contains('cursor-pointer');
        setIsHovering(isClickable);
      }
    };

    const handleTouchStart = (e) => {
      if (isTouchDevice) {
        const touch = e.touches[0];
        setPosition({ x: touch.clientX, y: touch.clientY });
        setIsVisible(true);
        setIsClicking(true);
      }
    };

    const handleTouchMove = (e) => {
      if (isTouchDevice) {
        // Only prevent default if we're actively showing the pointer
        // Allow normal scrolling when pointer is not active
        if (isVisible && e.touches.length === 1) {
          const touch = e.touches[0];
          setPosition({ x: touch.clientX, y: touch.clientY });
        }
        // Don't prevent default to allow normal scrolling
      }
    };

    const handleTouchEnd = () => {
      if (isTouchDevice) {
        setIsClicking(false);
        // Keep visible for a short time after touch
        setTimeout(() => setIsVisible(false), 1000);
      }
    };

    // Add event listeners for both mouse and touch to be safe
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mouseover', handleMouseOver, true);
    
    // Also add touch events for hybrid devices (but allow normal scrolling)
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      // Remove the style element that hides cursors
      const styleElement = document.getElementById('custom-cursor-hide');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [isTouchDevice]);

  // Show for desktop (non-touch) or when explicitly visible on touch
  if (!isTouchDevice || isVisible) {
    return (
      <div
        className={cn(
          "fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out",
          isClicking ? "scale-75" : "scale-100"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.75 : isHovering ? 1.3 : 1})`,
          willChange: 'transform',
        }}
      >
      {/* Outer ring */}
      <div
        className={cn(
          "w-6 h-6 rounded-full border-2 transition-all duration-200",
          isHovering 
            ? "dark:border-yellow-400 border-yellow-500 shadow-lg" 
            : "dark:border-primary/80 border-primary/60",
          isClicking ? "animate-pulse" : ""
        )}
      >
        {/* Inner dot */}
        <div
          className={cn(
            "w-2 h-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
            isHovering 
              ? "dark:bg-yellow-400 bg-yellow-500" 
              : "dark:bg-primary bg-primary/80",
            isClicking ? "scale-150" : "scale-100"
          )}
        />
      </div>
      
      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-200",
          isHovering
            ? "dark:shadow-[0_0_25px_theme(colors.yellow.400/0.6)] shadow-[0_0_20px_theme(colors.yellow.500/0.4)]"
            : "dark:shadow-[0_0_20px_hsl(var(--primary)/0.5)] shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
          isClicking ? "opacity-100" : "opacity-60"
        )}
      />
      
      {/* Touch ripple for mobile */}
      {isTouchDevice && isClicking && (
        <div
          className="absolute inset-0 rounded-full border border-primary/30 animate-ping"
          style={{
            animation: "ping 0.6s cubic-bezier(0, 0, 0.2, 1)"
          }}
        />
      )}
    </div>
  );
  }
  
  return null;
};