// HelpButton.js

import React from 'react';

const HelpButton = ({ onHelp }) => {
  const handleHelp = () => {
    onHelp();
  };

  return (
    <button onClick={handleHelp}>
      Help
    </button>
  );
};

export default HelpButton;
