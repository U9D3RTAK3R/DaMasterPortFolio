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
        background: 'var(--paper-2)',
        border: `1px solid ${isDestructive ? 'var(--error)' : 'var(--rule-strong)'}`,
        borderRadius: 3,
        boxShadow: 'var(--shadow-overlay)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        fontFamily: 'var(--font-mono)',
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
      color: 'var(--ink-2)',
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
      fontSize: '0.78rem',
      fontWeight: 600,
      color: 'var(--accent)',
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
      fontSize: '0.7rem',
      color: 'var(--ink-1)',
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
