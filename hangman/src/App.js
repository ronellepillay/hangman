import React, { useState, useEffect } from 'react';
import './App.css';
import HelpButton from './HelpButton';
import Keyboard from './Keyboard';
import WordDisplay from './WordDisplay';

// List of words for the game
const wordList = ['hangman', 'javascript', 'react', 'openai'];

/**
 * Main Hangman Game component.
 */
const App = () => {
  // State variables
  const [word, setWord] = useState(''); // The selected word for the game
  const [hiddenWord, setHiddenWord] = useState(''); // The word with hidden letters
  const [guessedLetters, setGuessedLetters] = useState([]); // Array of guessed letters
  const [wrongGuesses, setWrongGuesses] = useState(0); // Number of wrong guesses
  const [maxGuesses] = useState(10); // Maximum allowed wrong guesses
  const [gameOver, setGameOver] = useState(false); // Flag indicating if the game is over
  const [gameResult, setGameResult] = useState(''); // Result message of the game
  const [showHelp, setShowHelp] = useState(false); // Flag indicating if the help section is shown
  const [gameResults, setGameResults] = useState({
    totalGames: 0,
    wins: 0,
    losses: 0,
  }); // Game results statistics

  // Resets the game state to start a new game
  const handleRestart = () => {
    setWord('');
    setHiddenWord('');
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setGameResult('');
    getRandomWord();
  };

  // Retrieves a random word from the word list
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setWord(wordList[randomIndex].toLowerCase());
  };

  // Handles a letter guess event
  const handleGuess = (letter) => {
    if (!gameOver && !guessedLetters.includes(letter)) {
      const updatedGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(updatedGuessedLetters);

      if (!word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  // Handles the help button click event
  const handleHelp = () => {
    setShowHelp(true);
  };

  // Retrieves a random word when the component mounts
  useEffect(() => {
    getRandomWord();
  }, []);

  // Updates the hidden word when the selected word changes
  useEffect(() => {
    if (word) {
      setHiddenWord(word.replace(/\w/g, '_'));
    }
  }, [word]);

  // Checks if the game is over and updates the game result and game statistics
  useEffect(() => {
    const revealedWord = word
      .split('')
      .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
      .join('');
    setHiddenWord(revealedWord);

    if (revealedWord === word) {
      setGameOver(true);
      setGameResult('Congratulations! You won!');
      setGameResults((prevResults) => ({
        ...prevResults,
        totalGames: prevResults.totalGames + 1,
        wins: prevResults.wins + 1,
      }));
    } else if (wrongGuesses === maxGuesses) {
      setGameOver(true);
      setGameResult(`Game Over! The word was "${word}".`);
      setGameResults((prevResults) => ({
        ...prevResults,
        totalGames: prevResults.totalGames + 1,
        losses: prevResults.losses + 1,
      }));
    }
  }, [word, guessedLetters, wrongGuesses, maxGuesses]);

  // Array of hangman images
  const hangmanImages = [
    require('./images/hangman-0.gif'),
    require('./images/hangman-1.gif'),
    require('./images/hangman-2.gif'),
    require('./images/hangman-3.gif'),
    require('./images/hangman-4.gif'),
    require('./images/hangman-5.gif'),
    require('./images/hangman-6.gif'),
    require('./images/hangman-7.gif'),
    require('./images/hangman-8.gif'),
    require('./images/hangman-9.gif'),
    require('./images/hangman-10.gif'),
  ];

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <WordDisplay hiddenWord={hiddenWord} />
      <img src={hangmanImages[wrongGuesses]} alt="Hangman" className="hangman-image" />
      <Keyboard guessedLetters={guessedLetters} onGuess={handleGuess} disabled={gameOver} />
      {gameOver && (
        <div className="game-result">
          <p>{gameResult}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      {!gameOver && !showHelp && <HelpButton onHelp={handleHelp} />}
      {showHelp && (
        <div className="help">
          <h2>Hangman Game - Help</h2>
          <p>
            The Hangman Game is a word guessing game. The objective is to guess the hidden word by selecting letters
            one by one. You have a limited number of attempts before the game ends.
          </p>
          <p>
            Click on the letter buttons to make your guesses. If the letter is correct, it will be revealed in the
            word. If the letter is incorrect, the hangman image will progressively appear.
          </p>
          <p>
            You win the game if you guess the entire word correctly. If you make too many wrong guesses, the hangman
            will be completely displayed, and you will lose the game.
          </p>
          <p>Click the "Restart" button to start a new game.</p>
        </div>
      )}
      <div className="game-results">
        <h2>Game Results</h2>
        <p>Total Games: {gameResults.totalGames}</p>
        <p>Wins: {gameResults.wins}</p>
        <p>Losses: {gameResults.losses}</p>
      </div>
    </div>
  );
};

export default App;
