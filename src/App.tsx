import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Slider } from '@material-ui/core';
import PlayerControls from './PlayerControls';


interface IProps { }


interface IState {
  currentWord: string;
  currentState: "playing" | "paused";
  currentSpeed: number; //Speed in words per minute
}

class App extends Component<IProps, IState>  {
  constructor(props: IProps) {
    super(props);
    
    //LEARN: Why do i need to bind functions in JS? 
    this.handleOnPlayerStateChange = this.handleOnPlayerStateChange.bind(this);
    this.handleOnSpeedChange = this.handleOnSpeedChange.bind(this);

    this.state = {
      currentWord: "",
      currentState: "paused",
      currentSpeed: 100,
    };
  }

  handleOnPlayerStateChange(state : IState["currentState"])
  {
      this.setState({currentState: state})
  }


  handleOnSpeedChange(speed: number)
  {
      this.setState({currentSpeed: speed});
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Speed Reader</h1>
        </header>

        <div>
          <PlayerControls
            currentSpeed={this.state.currentSpeed} 
            currentState={this.state.currentState}
            onSpeedChanged={this.handleOnSpeedChange}
            onStateChanged={this.handleOnPlayerStateChange}
          ></PlayerControls>
        </div>


        <a>{this.state.currentWord}</a>
      </div>
    );
  }

}

export default App;
