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
                    this.submissions.map((submission) => {
                        return (
                            <div key={submission}>
                                {submission}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}