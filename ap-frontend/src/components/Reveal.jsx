import { motion } from 'motion/react'

function Reveal({ children, duration = 1.5, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: duration, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
