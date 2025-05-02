"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaFire, FaRegLightbulb } from "react-icons/fa";

const mockCards = [
  { front: "What is the capital of France?", back: "Paris" },
  { front: "2 + 2 = ?", back: "4" },
  { front: "What is the powerhouse of the cell?", back: "Mitochondria" },
];

export default function StudyPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [xp, setXp] = useState(120);
  const [streak, setStreak] = useState(3);

  const currentCard = mockCards[index];
  const isLastCard = index === mockCards.length - 1;

  const handleNext = (correct: boolean) => {
    if (correct) {
      setXp((prev) => prev + 10);
      setStreak((prev) => Math.min(prev + 1, 10));
    } else {
      setStreak(0);
    }
    setFlipped(false);
    if (!isLastCard) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleFlip = () => setFlipped(true);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaFire className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="font-semibold">🔥 {streak}-Day Streak</p>
              <p className="text-sm text-gray-500">Best: 10 days</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">🎯 {xp} XP</p>
            <p className="text-sm text-gray-500">
              Card {index + 1} of {mockCards.length}
            </p>
          </div>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / mockCards.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Flashcard with Flip */}
      <div className="w-full max-w-md h-80 perspective-1000 flex justify-center mb-8">
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-center text-xl font-medium space-y-6">
            <p>{currentCard.front}</p>
            <Button
              onClick={handleFlip}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              👀 Reveal Answer
            </Button>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-center text-xl font-medium space-y-6">
            <p>{currentCard.back}</p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => handleNext(false)}
                disabled={isLastCard}
                className="hover:bg-red-50"
              >
                ❌ I Missed It
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleNext(true)}
                disabled={isLastCard}
              >
                ✅ I Got It Right
              </Button>
            </div>
            <div className="text-blue-500 text-2xl">
              <FaRegLightbulb />
            </div>
          </div>
        </div>
      </div>

      {/* Completion */}
      <AnimatePresence>
        {isLastCard && flipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center space-y-4"
          >
            <div className="bg-green-100 p-4 rounded-xl inline-block">
              <p className="text-green-600 font-semibold text-xl">
                🎉 Deck Completed! +50 XP Bonus
              </p>
            </div>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                setIndex(0);
                setFlipped(false);
              }}
            >
              🔄 Restart Deck
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak Badge */}
      {streak >= 3 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed top-4 right-4 flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full"
        >
          <FaFire className="text-orange-500" />
          <span className="font-semibold">{streak} Day Streak!</span>
        </motion.div>
      )}

      {/* Flip CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </main>
  );
}
