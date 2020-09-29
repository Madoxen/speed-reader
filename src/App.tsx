import { createMuiTheme, ThemeProvider } from '@material-ui/core';
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

  theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });


  constructor(props: IProps) {
    super(props);

    this.handleOnPlayerStateChange = this.handleOnPlayerStateChange.bind(this);
    this.handleOnSpeedChange = this.handleOnSpeedChange.bind(this);
    this.handleBookChanged = this.handleBookChanged.bind(this);
    this.cycleWord = this.cycleWord.bind(this);
    this.handleWordIndexChanged = this.handleWordIndexChanged.bind(this);

    this.state = {
      currentWordIndex: 0,
      currentState: "paused",
      currentSpeed: 100,
      currentBook: null,
    };
  }

  componentWillUnmount() {
    if (this.timerID !== null)
      clearInterval(this.timerID)
  }


  handleOnPlayerStateChange(state: IState["currentState"]) {
    this.setState({ currentState: state })
    this.toggleInterval();
  }

  handleOnSpeedChange(speed: number) {
    this.setState({ currentSpeed: speed });
    if (this.state.currentState === "playing")
      this.resetInterval();
  }


  handleBookChanged(slicedBook: string[]) {
    if (this.timerID !== null) {
      window.clearInterval(this.timerID);
    }

    //If book changes, set word array to the new one, and reset word index
    this.setState({ currentBook: slicedBook, currentWordIndex: 0 });
  }

  handleWordIndexChanged(newIndex: number) {
    this.setState({ currentWordIndex: newIndex });
  }


  //cycles to next word
  private cycleWord() {
    this.setState((state) => ({
      currentWordIndex: state.currentWordIndex + 1
    }));
  }

  //toggles interval timer on and off
  private toggleInterval() {
    if (this.timerID !== -1) {
      window.clearInterval(this.timerID);
      this.timerID = -1;
    }
    else {
      //ex. WPM -> minute per word -> ms per word so 1/WPM * 60 * 1000
      this.timerID = window.setInterval(this.cycleWord, (1.0 / this.state.currentSpeed) * 60000.0) //100 WPM -> 0.01 * 60000 = 600 ms = 0.6sec gut
    }
  }

  //Resets interval timer that cycles words
  private resetInterval() {
    if (this.timerID !== -1) {
      window.clearInterval(this.timerID);
      this.timerID = -1;
    }
    this.timerID = window.setInterval(this.cycleWord, (1.0 / this.state.currentSpeed) * 60000.0) //100 WPM -> 0.01 * 60000 = 600 ms = 0.6sec gut
  }


  render() {
    let book = this.state.currentBook;
    let word: string | null = null;
    let maxWords: number = 0
    if (book !== null) {
      word = book[this.state.currentWordIndex];
      maxWords = book.length;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Speed Reader</h1>
        </header>

        <ThemeProvider theme={this.theme}>
          <WordContainer word={word}></WordContainer>

          <div className="App-controls">

            <BookProcessor bookChangedHandler={this.handleBookChanged}></BookProcessor>
            <PlayerControls
              currentWordIndex={this.state.currentWordIndex}
              wordMax={maxWords}
              wordIndex={this.state.currentWordIndex}
              currentSpeed={this.state.currentSpeed}
              currentState={this.state.currentState}
              onSpeedChanged={this.handleOnSpeedChange}
              onStateChanged={this.handleOnPlayerStateChange}
              onWordIndexChanged={this.handleWordIndexChanged}
            ></PlayerControls>
          </div>
        </ThemeProvider>



      </div>
    );
  }

}

export default App;
