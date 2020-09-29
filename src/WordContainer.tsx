import React from 'react';
import {Component} from 'react'
import './App.css';


interface IProps
{
    word : string | null;
}


class WordContainer extends Component<IProps>
{
    constructor(props : IProps)
    {
        super(props);
    }

    render()
    {
        return(
            <>
                <p className="App-word-container">{this.props.word}</p>
            </>
        );
    }

}

export default WordContainer