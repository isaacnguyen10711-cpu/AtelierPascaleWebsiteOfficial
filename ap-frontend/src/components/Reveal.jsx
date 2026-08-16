import { motion } from 'motion/react'

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.5, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
