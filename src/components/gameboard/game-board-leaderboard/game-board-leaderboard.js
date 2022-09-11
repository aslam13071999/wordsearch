import {Component} from "react";
import './game-board-leaderboard.css'

export class GameBoardLeaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board_submissions: this.calculateSubmissionsByUser()
        }
    }

    calculateSubmissionsByUser = () => {
        console.log("GameBoardLeaderboard.calculateSubmissionsByUser")
        let solved_count = {}
        this.props.board_submissions.forEach((submission) => {
            const display_name = submission.submission_by.display_name
            if (solved_count.hasOwnProperty(display_name) === false) {
                solved_count[display_name] = 0
            }
            solved_count[display_name] += 1
        })
        console.log("calculateSubmissionsByUser", solved_count)
        let data = []
        for (let key in solved_count) data.push({user: key, solved_count: solved_count[key]})
        data.sort((a, b) => {
            return a.solved_count !== b.solved_count ? a.solved_count < b.solved_count : a.user > b.user
        })
        return data
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.board_submissions.length !== prevProps.board_submissions.length) {
            console.log("GameBoardLeaderboard.componentDidUpdate")
            this.setState({
                ...this.state,
                board_submissions: this.calculateSubmissionsByUser()
            })
        }
    }

    render = () => {
        console.log("GameBoardLeaderboard.render")
        return (
            <div>
                <div className={"text-center font-semibold  py-1 md:mt-2 lg:mt-6  sm:mx-1 md:mx-3 lg:mx-12 border-2 border-gray dark:border-dark-primary"}>
                    Submissions
                </div>
                <div className={"grid grid-cols-1 lg:mx-5 my-2 lg:p-4"}>
                    {
                        this.state.board_submissions.map((submission, index) => {
                            return (
                                <div className={`mx-4  rounded-md ${index === -1 ? 'bg-green-500' : ''}`}
                                     key={submission.user}>
                                    <div
                                        className={`float-left uppercase align-middle mg:mx-1 lg:mx-3 lg:font-semibold font-robo`}>
                                        {submission.user}
                                    </div>
                                    <div
                                        className={"float-right align-middle mg:mx-1 lg:mr-3 pr-2  rounded-md border-gray-600  font-robo  "}>
                                        {submission.solved_count} point{submission.solved_count > 1 ? 's' : ''}
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
        )
    }
}