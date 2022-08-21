import {Component} from "react";


export class GameBoardLeaderboard extends Component {

    constructor(props) {
        super(props);
        this.submissions = this.props.submissions
    }

    render = () => {
        return (
            <div>
                <center> Submissions </center>
                {
                    this.submissions.forEach((submission) => {
                        return (
                            <div key={submission.submission_id}>
                                {submission}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}