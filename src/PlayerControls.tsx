import React, { ChangeEvent, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Slider } from '@material-ui/core';
import { isPropertySignature } from 'typescript';


interface IProps {
    currentState: "playing" | "paused"
    currentSpeed: number;
    onSpeedChanged: any, //TODO: change to concrete type 
    onStateChanged: any, //TODO: change to concrete type 

}


class PlayerControls extends Component<IProps>  {
    constructor(props: IProps) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onSliderValueChange = this.onSliderValueChange.bind(this);
    }


    onButtonClick(e : any)
    {
        let newState : string = "";
        //TODO: Isnt there a better way? 
        if(this.props.currentState === "playing")
        {
            newState = "paused";
        }
        else
        {
            newState = "playing"
        }
        this.props.onStateChanged(newState);
    }

    onSliderValueChange(e : any)
    {
        this.props.onSpeedChanged(e.target.value)
    }

    render() {
        return (
            <> {/*Fragment*/}
                <Slider value={this.props.currentSpeed} step={1} valueLabelDisplay="auto" onChange={this.onSliderValueChange}></Slider>
                <Button onClick={this.onButtonClick}>
                    <a>{this.props.currentState}</a>
                </Button>
            </>
        );
    }

}

export default PlayerControls;
