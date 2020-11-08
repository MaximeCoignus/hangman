import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';

const WORDS = ["PARIS", "MARSEILLE", "VOITURE"];
const A = 65; // ASCII character code
const TRIALS = 3;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboard: Array.from({length: 26}, (_, i) => String.fromCharCode(A + i)),
      word: this.generateWord(),
      selectedLetters: [],
      gameState: "In progress",
      score: 0,
      attempts: TRIALS
    };
  }

  generateWord() {
    const candidates = shuffle(WORDS);
    const wordToSplit = candidates.pop();
    return wordToSplit.split('');
  }

  getFeedback(letter) {
    const { selectedLetters } = this.state;

    return selectedLetters.includes(letter);
  }

  // binding this
  updateGameState = () => {
    const { selectedLetters, word, score, attempts } = this.state;
    const findWord = word.filter(letter => selectedLetters.includes(letter)).length === word.length;
    const findLetter = word.filter(letter => selectedLetters[selectedLetters.length-1] === letter);

    findLetter.length !== 0 ? this.setState({score: score + findLetter.length*2}) : this.setState({score: score - 1, attempts: attempts-1}, this.updateLoss);
    
    if (findWord) {
      this.setState({gameState: "YOU WIN!"});
    }
  }

  updateLoss = () => {
    const { attempts } = this.state;
    if (attempts === 0) {
      this.setState({gameState: "YOU LOSE!"});
    }
  }

  handleLetterClick = index => {
    const { gameState, selectedLetters, keyboard } = this.state;

    if(gameState === "In progress") {
      this.setState({selectedLetters: [...selectedLetters, keyboard[index]]}, this.updateGameState);
    }
  }

  newGame = () => {
    this.setState({ selectedLetters: [], gameState: "In progress", word: this.generateWord(), score: 0, attempts: TRIALS });
  }



  render() {
    return (
      <div className="hangman">
        <div className="word">
          {this.state.word.map((letter, index) => 
            {
              return <span className="letter" key={index}>{this.getFeedback(letter) ? letter : '__'}</span>
            }
          )}
        </div>
        {
          this.state.gameState === "In progress" ? (
            <div className="keyboard">
              {
                this.state.keyboard.map((letter, index) => {
                  return <span className={this.getFeedback(letter) ? 'key selected' : 'key'} key={index} index={index} onClick={() => this.handleLetterClick(index)}>{letter}</span>
                })
              }
            </div>
          ) : (
            <div>
              <p>{this.state.gameState}</p>
              <span class="fas fa-undo-alt new-game" onClick={this.newGame}></span>
            </div>
          )
        }
        <p>Score: {this.state.score}</p>
        <p>Remaining attempts: {this.state.attempts}</p>
      </div>
    );
  }
}

export default App;
