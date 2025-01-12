import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text, speed = 150 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If the text hasn't been fully typed, keep typing
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);

      // Cleanup the timeout if the component is unmounted or the effect finishes
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
      displayedText
  );
};

export default TypewriterEffect;
