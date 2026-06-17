import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(({ ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    style={{
      position: 'fixed',
      top: 16,
      right: 16,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      maxWidth: 380,
      outline: 'none',
    }}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const Toast = React.forwardRef(({ variant, ...props }, ref) => {
  const isDestructive = variant === 'destructive'
  return (
    <ToastPrimitives.Root
      ref={ref}
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 18px',
        background: isDestructive ? 'rgba(30,6,14,0.97)' : 'rgba(10,10,22,0.97)',
        border: `1px solid ${isDestructive ? 'rgba(255,50,50,0.3)' : 'rgba(0,212,255,0.2)'}`,
        borderRadius: 6,
        boxShadow: isDestructive
          ? '0 8px 32px rgba(255,50,50,0.15), inset 0 1px 0 rgba(255,50,50,0.1)'
          : '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.08), inset 0 1px 0 rgba(0,212,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        fontFamily: "'Share Tech Mono', monospace",
      }}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastClose = React.forwardRef(({ ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    style={{
      position: 'absolute',
      top: 6,
      right: 8,
      background: 'none',
      border: 'none',
      color: 'rgba(136,136,170,0.5)',
      cursor: 'pointer',
      padding: 2,
      lineHeight: 1,
    }}
    toast-close=""
    {...props}
  >
    <X size={14} />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    style={{
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#00d4ff',
      letterSpacing: '0.05em',
      lineHeight: 1.3,
    }}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    style={{
      fontSize: '0.65rem',
      color: '#8888aa',
      lineHeight: 1.4,
      marginTop: 2,
    }}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
}
