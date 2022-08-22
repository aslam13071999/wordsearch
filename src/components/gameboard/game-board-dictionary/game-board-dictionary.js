import {Component} from "react";
import './game-board-dictionary.css'

export class GameBoardDictionary extends Component {
    constructor(props) {
        super(props)
        console.log("GameBoardDictionary.constructor")
        this.setAttributesFromProps()
        this.state = {
            dictionary: this.getDictionaryWithSolveStatus()
        }
    }

    getDictionaryWithSolveStatus = () => {
        console.log("GameBoardDictionary.getDictionaryWithSolveStatus")
        const submission_words = []
        this.board_submissions.forEach((submission) => {
            submission_words.push(submission['submission_data']['word'])
        })
        let dictionary = []
        this.board_dictionary.forEach((dictionary_item) => {
            dictionary.push(
                {
                    'word': dictionary_item,
                    'solved': submission_words.indexOf(dictionary_item) > -1
                }
            )
        })
        return dictionary
    }

    setAttributesFromProps() {
        console.log("GameBoardDictionary.setAttributesFromProps")
        this.board_dictionary = this.props.board_dictionary;
        this.board_submissions = this.props.board_submissions
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.board_submissions.length != this.props.board_submissions.length){
            console.log("GameBoardDictionary.componentDidUpdate")
            this.setAttributesFromProps()
            this.setState({
                dictionary: [...this.getDictionaryWithSolveStatus()]
            })
        }
    }

    render = () => {
        console.log("GameBoardDictionary.render")
        const dictionary_with_status = this.getDictionaryWithSolveStatus()
        return (
            <div>
                {
                    dictionary_with_status.map((row) => {
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