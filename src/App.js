import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';

const words = ["PARIS", "MARSEILLE", "VOITURE"];
const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class App extends Component {
  state = {
    keyboard: this.generateKeyboard(),
    word: this.generateWord(),
    selectedLetters: [],
    gameState: "In progress"
  }

  generateKeyboard() {
    return keys.split('');
  }

  generateWord() {
    const candidates = shuffle(words);
    const wordToSplit = candidates.pop();
    return wordToSplit.split('');
  }

  getFeedback(letter) {
    const { selectedLetters } = this.state;

    return selectedLetters.includes(letter);
  }

  // binding this
  updateGameState = () => {
    const { selectedLetters, word } = this.state;
    const findWord = word.filter(letter => selectedLetters.includes(letter)).length === word.length;
    
    if (findWord) {
      this.setState({gameState: "YOU WIN!"});
    }
  }

  handleLetterClick = index => {
    const { gameState, selectedLetters, keyboard } = this.state;

    if(gameState === "In progress") {
      this.setState({selectedLetters: [...selectedLetters, keyboard[index]]}, this.updateGameState);
    }
  }

  newGame = () => {
    this.setState({ selectedLetters: [], gameState: "In progress", word: this.generateWord() });
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
      </div>
    );
  }
}

export default App;
