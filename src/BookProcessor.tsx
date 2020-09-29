import React, { ChangeEvent, Component } from 'react';


interface IProps
{
    bookChangedHandler : (slicedBook: string[]) => void; 
}

interface IState
{

}

class BookProcessor extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.onFileChosen = this.onFileChosen.bind(this);
    }
    

    onFileChosen(e : ChangeEvent<HTMLInputElement>)
    {
        const strategyDictionary: {[key: string]: (file: File) => Promise<string[]>} = {
            "text/plain":  this.processTxt,
            "application/epub+zip": this.processEpub
        }
        
        
        if(e.target.files === null || e.target.files.length < 0)
            return; //we cannot process non existing file list, or empty file list

        //process ONLY first file in a list
        let file = e.target.files[0];
        strategyDictionary[file.type](file).then(result => {
            this.props.bookChangedHandler(result);
        });
    }

    private async processEpub(file : File) : Promise<string[]>
    {
        //MIME: application/epub+zip
        console.log("Processing epub...")
        const result = await file.text();
        return [];
    }

    private async processMobi(file : File) : Promise<string[]>
    {
        //TODO: research MOBI
        //MIME
        const result = await file.text();
        return [];
    }

    private async processTxt(file : File) : Promise<string[]>
    {
        //MIME: text/plain
        console.log("Processing txt...")
        const result = await file.text();
        return result.split(" ");
    }


    render() {
        return(
        <>
            <input type="file" accept=".txt,application/epub+zip" onChange={this.onFileChosen}></input>
        </>);
    }
}

export default BookProcessor