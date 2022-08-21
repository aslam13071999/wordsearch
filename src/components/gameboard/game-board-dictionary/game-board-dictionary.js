import {Component} from "react";
import './game-board-dictionary.css'

export class GameBoardDictionary extends Component{
    constructor(props){
        super(props)
        this.board_dictionary = this.props.board_dictionary;
        this.board_submissions = this.props.board_submissions
        const submission_words = []
        this.board_submissions.forEach((submission) => {
            submission_words.push(submission.submission_data.word)
        })


        this.dictionary = []
        this.board_dictionary.forEach((dictionary_item) => {
            // TODO: need to change is_solved, should look in solved_words
            this.dictionary.push({'word': dictionary_item, 'solved': submission_words.indexOf(dictionary_item) > -1})
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