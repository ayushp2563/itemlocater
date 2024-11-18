"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-8">
      {/* Animated Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center animate-fade-down">
        Welcome to Item Locator
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl mb-10 text-justify sm:text-center max-w-3xl animate-fade-up">
        Never lose track of your belongings again. Item Locator helps you
        remember where you put everything.
      </p>

      {/* Button */}
      <div className="animate-fade-in">
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-4 shadow-lg rounded-lg transition-all duration-300"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Floating Animation */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-float">
        <p className="text-sm text-white/70">Scroll down to learn more</p>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fade-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }

        .animate-fade-down {
          animation: fade-down 0.8s ease-out forwards;
        }

        .animate-fade-up {
          animation: fade-up 0.8s ease-out 0.4s forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.6s forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
