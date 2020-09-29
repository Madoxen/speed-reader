import React, { ChangeEvent, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Slider } from '@material-ui/core';
import { isPropertySignature, parseConfigFileTextToJson } from 'typescript';


interface IProps {
    currentState: "playing" | "paused",
    currentWordIndex: number,
    wordMax: number,
    currentSpeed: number,
    wordIndex: number,
    onSpeedChanged: any, //TODO: change to concrete type 
    onStateChanged: any, //TODO: change to concrete type 
    onWordIndexChanged: any, //TODO: change to concrete type 
}


class PlayerControls extends Component<IProps>  {

    maxWordsPerMinute: number = 1000;
    minWordsPerMinute: number = 0;

    constructor(props: IProps) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onSliderValueChange = this.onSliderValueChange.bind(this);
        this.onWordIndexSliderValueChange = this.onWordIndexSliderValueChange.bind(this);
    }

    onButtonClick(e: any) {
        let newState: string = "";
        //TODO: Isnt there a better way? 
        if (this.props.currentState === "playing") {
            newState = "paused";
        }
        else {
            newState = "playing"
        }
        this.props.onStateChanged(newState);
    }

    onSliderValueChange(e: ChangeEvent<{}>, value: number | number[]) {
        this.props.onSpeedChanged(value);
    }

    onWordIndexSliderValueChange(e: ChangeEvent<{}>, value: number | number[]) {
        this.props.onWordIndexChanged(value);
    }

    render() {
        return (
            <> {/*Fragment*/}
                <Slider step={1} valueLabelDisplay="auto" onChange={this.onSliderValueChange} max={this.maxWordsPerMinute} min={this.minWordsPerMinute}></Slider>
                <Slider step={1} valueLabelDisplay="on" onChange={this.onWordIndexSliderValueChange} max={this.props.wordMax} min={0} value={this.props.wordIndex}></Slider>
                <Button onClick={this.onButtonClick}>
                    <a>{this.props.currentState}</a>
                </Button>
            </>
        );
    }

}

export default PlayerControls;
