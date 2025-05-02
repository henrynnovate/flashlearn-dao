"use client";

import { motion } from "framer-motion";

export function WalletSignIn() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full px-6 py-3 bg-purple-600 text-white rounded-full font-medium transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      🔐 Connect Wallet
    </motion.button>
  );
}
