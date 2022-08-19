import {Component} from "react";
import './game-board-dictionary.css'

export class GameBoardDictionary extends Component{
    constructor(props){
        super(props)
        this.board_dictionary = this.props.board_dictionary;
        this.solved_words = this.props.solved_words
        this.dictionary = []
        this.board_dictionary.forEach((dictionary_item) => {
            // TODO: need to change is_solved, should look in solved_words
            let is_solved = Math.random() > 0.5 ? true : false;
            this.dictionary.push({'word': dictionary_item, 'solved': is_solved})
        })
    }

    render = () => {
        return(
            <div>
                {
                    this.dictionary.map((row) => {
                        return (
                            <div key={row.word}
                                 className={`dictionary-item ${row.solved ? "solved" : ""}`}>
                                {row.word}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}