import React, { Component } from 'react';
import './App.css';
import BookProcessor from './BookProcessor';
import PlayerControls from './PlayerControls';
import WordContainer from './WordContainer';


interface IProps { }

interface IState {
  currentWordIndex: number;
  currentState: "playing" | "paused";
  currentSpeed: number; //Speed in words per minute
  currentBook: string[] | null; //array of words
}

class App extends Component<IProps, IState>  {

  timerID: number = -1;


  constructor(props: IProps) {
    super(props);

    this.handleOnPlayerStateChange = this.handleOnPlayerStateChange.bind(this);
    this.handleOnSpeedChange = this.handleOnSpeedChange.bind(this);
    this.handleBookChanged = this.handleBookChanged.bind(this);
    this.cycleWord = this.cycleWord.bind(this);

    this.state = {
      currentWordIndex: 0,
      currentState: "paused",
      currentSpeed: 100,
      currentBook: null,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }


  handleOnPlayerStateChange(state: IState["currentState"]) {
    this.setState({ currentState: state })

    this.toggleInterval();

  }

  handleOnSpeedChange(speed: number) {
    this.setState({ currentSpeed: speed });
    this.resetInterval();
  }

  handleBookChanged(slicedBook: string[]) {
    this.setState({ currentBook: slicedBook });
    console.log(this.state.currentBook)
  }

  //cycles to next word
  private cycleWord() {
    this.setState((state) => ({
      currentWordIndex: state.currentWordIndex + 1
    }));
  }

  //toggles interval timer on and off
  private toggleInterval() {
    if (this.state.currentState == "playing") {
      //ex. WPM -> minute per word -> ms per word so 1/WPM * 60 * 1000
      this.timerID = window.setInterval(this.cycleWord, (1.0 / this.state.currentSpeed) * 60000.0) //100 WPM -> 0.01 * 60000 = 600 ms = 0.6sec gut
    }
    else if (this.timerID !== null) {
      window.clearInterval(this.timerID);
    }
  }

  //Resets interval timer that cycles words
  private resetInterval() {
    if (this.timerID !== null) {
      window.clearInterval(this.timerID);
    }
    this.timerID = window.setInterval(this.cycleWord, (1.0 / this.state.currentSpeed) * 60000.0) //100 WPM -> 0.01 * 60000 = 600 ms = 0.6sec gut
  }




  render() {
    let book = this.state.currentBook;
    let word: string | null = null;
    if (book !== null) {
      word = book[this.state.currentWordIndex];
    }



    return (
      <div className="App">
        <header className="App-header">
          <h1>Speed Reader</h1>
        </header>





        <div className="App-controls">
          <WordContainer word={word}></WordContainer>
          <BookProcessor bookChangedHandler={this.handleBookChanged}></BookProcessor>
          <PlayerControls
            currentSpeed={this.state.currentSpeed}
            currentState={this.state.currentState}
            onSpeedChanged={this.handleOnSpeedChange}
            onStateChanged={this.handleOnPlayerStateChange}
          ></PlayerControls>
        </div>


      </div>
    );
  }

}

export default App;
