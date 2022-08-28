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
            console.log("calculateSubmissionsByUser", submission)
            const username = submission.submission_by.username
            if (solved_count.hasOwnProperty(username) === false) {
                solved_count[username] = 0
            }
            solved_count[username] += 1
        })
        console.log("calculateSubmissionsByUser", solved_count)
        let data = []
        for (let key in solved_count) data.push({user: key, solved_count: solved_count[key]})
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
                <div className={"text-center font-semibold " +
                    " py-1" +
                    " md:mt-2 lg:mt-6 " +
                    " sm:mx-1 md:mx-3 lg:mx-12" +
                    " border-2 border-gray dark:border-dark-primary"}>
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
                                        className={"float-right align-middle mg:mx-1 lg:mx-3 px-2  rounded-md border-gray-600  font-robo  "}>
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