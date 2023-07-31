import React from 'react';

/**
 * Keyboard component for displaying letter buttons for user input.
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.guessedLetters - Array of guessed letters.
 * @param {function} props.onGuess - Callback function when a letter is guessed.
 * @param {boolean} props.disabled - Flag indicating if the keyboard is disabled.
 * @returns {JSX.Element} Keyboard component.
 */
const Keyboard = ({ guessedLetters, onGuess, disabled }) => {
  /**
   * Handles the letter guess event.
   * Calls the onGuess callback with the selected letter.
   *
   * @param {string} letter - The selected letter.
   */
  const handleGuess = (letter) => {
    if (!disabled) {
      onGuess(letter);
    }
  };

  return (
    <div className="keyboard">
      {Array.from(Array(26), (_, index) => {
        const letter = String.fromCharCode(65 + index).toLowerCase();
        const isGuessed = guessedLetters.includes(letter);

        return (
          <button
            key={index}
            disabled={isGuessed || disabled}
            onClick={() => handleGuess(letter)}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
