import {Component} from "react";

export default class CategoryViewSmall extends Component {

    render = () => {
        return (
            <div>
                <div> Category Name: {this.props.name} </div>
                <div> Category Description: {this.props.description} </div>
            </div>
        )
    }
}