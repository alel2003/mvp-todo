import { Link } from "react-router-dom"

import { motion } from "framer-motion"

export default function NotFoundPage() {
  return (
    <section className="flex h-screen items-center justify-center bg-[var(--color-black)] px-4">
      <div className="text-center">
        <motion.h1
          className="text-[100px] leading-none font-bold text-[#7CFC00] md:text-[160px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}>
          <motion.span
            animate={{
              y: [0, -10, 10, -10, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="inline-block">
            4
          </motion.span>
          <motion.span
            animate={{
              rotate: [0, 15, -15, 15, -15, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="inline-block">
            0
          </motion.span>
          <motion.span
            animate={{
              y: [0, 10, -10, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="inline-block">
            4
          </motion.span>
        </motion.h1>

        <motion.p
          className="mb-6 text-lg text-[#7CFC00] md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          Oops! This page does not exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}>
          <Link
            to="/"
            className="inline-block rounded-md bg-[#7CFC00] px-6 py-3 text-base font-medium text-[var(--color-black)] transition">
            Back to home page
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
