import React from 'react';

const WordDisplay = ({ hiddenWord }) => {
  return (
    <div className="word-display">
      {/* Split the hiddenWord string into an array of letters */}
      {hiddenWord.split('').map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </div>
  );
};

export default WordDisplay;
