'use client'

import { motion } from 'framer-motion'

export const MotionDiv = motion.div
export const MotionP = motion.p
export const MotionLi = motion.li

// 列表container出现的动画
export const containerVariants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
    transform: 'translateY(16px) translateZ(0)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0)',
    transform: 'none',
    transition: {
      transform: { duration: 0.4, timeConstant: 750 },
      opacity: { duration: 0.7, timeConstant: 350 },
      filter: { duration: 1, timeConstant: 350, ease: [0.25, 0.3, 0.5, 1] },
      type: 'tween',
      duration: 0.6,
      delayChildren: 0,
      //   staggerChildren: 0.12, // 每个子项之间的延迟时间
      staggerChildren: 0.1, // 每个子项之间的延迟时间
    },
  },
}

// 列表item出现的动画
export const itemVariants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
    transform: 'translateY(16px) translateZ(0)',
    transition: {},
  },
  visible: {
    opacity: 1,
    filter: 'blur(0)',
    transform: 'none',
    transition: {
      transform: { duration: 0.2, timeConstant: 350 },
      opacity: { duration: 0.4, timeConstant: 350 },
      filter: { duration: 0.4, timeConstant: 350, ease: [0.25, 0.3, 0.5, 1] },
      type: 'tween',
      duration: 0.4,
    },
  },
}
