import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  'bounce-in': {
    hidden: { opacity: 0, scale: 0.7, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
    },
  },
  terminal: {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  'slide-graph': {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.35, 0.1, 0.25, 1] },
    },
  },
}

export const AnimatedSection = ({
  children,
  className,
  animationType = 'fade-up',
  delay = 0,
  once = true,
}) => {
  const ref = useRef()
  const isInView = useInView(ref, { once, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={variants[animationType] || variants['fade-up']}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.08,
}) => {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}
