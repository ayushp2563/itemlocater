"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-8">
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to Item Locator
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        className="text-lg sm:text-xl mb-10 text-justify sm:text-center max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        Never lose track of your belongings again. Item Locator helps you remember where you put everything.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-4 shadow-lg rounded-lg transition-all duration-300"
          >
            Get Started
          </Button>
        </Link>
      </motion.div>

      {/* Subtle floating animation */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <p className="text-sm text-white/70">Scroll down to learn more</p>
      </motion.div>
    </div>
  )
}
