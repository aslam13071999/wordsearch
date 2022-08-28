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
        let dictionary_unsolved = []
        let dictionary_solved = [];
        this.board_dictionary.forEach((dictionary_item) => {
            if (submission_words.indexOf(dictionary_item) > -1) {
                dictionary_solved.push({'word': dictionary_item, 'solved': true})
            } else {
                dictionary_unsolved.push({'word': dictionary_item, 'solved': false})
            }
        })
        let dictionary = []
        dictionary_unsolved.forEach(item => dictionary.push(item))
        dictionary_solved.forEach(item => dictionary.push(item))

        return dictionary
    }

    setAttributesFromProps() {
        console.log("GameBoardDictionary.setAttributesFromProps")
        this.board_dictionary = this.props.board_dictionary;
        this.board_submissions = this.props.board_submissions
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.board_submissions.length !== this.props.board_submissions.length) {
            console.log("GameBoardDictionary.componentDidUpdate")
            this.setAttributesFromProps()
            this.setState({
                dictionary: [...this.getDictionaryWithSolveStatus()]
            })
        }
    }

    render = () => {
        console.log("GameBoardDictionary.render")
        return (
            <div>
                <div className={"text-center md:mt-2 lg:mt-6 md:mx-3 border-2 border-gray lg:mx-12 py-1 font-semibold dark:border-dark-primary"}>
                    All Words
                </div>
                <div className={"flex justify-center items-center h-full"}>
                    <div className={"grid grid-cols-1 md:my-2 lg:my-7  sm:mx-2 mx-14 "}>
                        {
                            this.state.dictionary.map((row) => {
                                return (
                                    <div key={row.word}
                                         className={`text-center mx-1 lg:font-bold mx-16 md:py-0.5 lg:py-2 border-gray-300 dark:border-gray-800 ${row.solved ? "text-green-400" : ""}`}>
                                        {row.word}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}