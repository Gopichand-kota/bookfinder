import React from "react";
import { motion } from "framer-motion";

const BookCard = ({ title, author, image }) => {
  return (
    <motion.div
      className="bg-gray-900 rounded-xl p-4 hover:scale-105 transform transition-all duration-300 shadow-lg cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={image}
        alt={title}
        className="rounded-lg w-full h-64 object-cover mb-3"
      />
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-gray-400">{author}</p>
    </motion.div>
  );
};

export default BookCard;
