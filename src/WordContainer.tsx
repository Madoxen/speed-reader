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
                <a>{this.props.word}</a>
            </>
        );
    }

}

export default WordContainer