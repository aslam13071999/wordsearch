import React from 'react'
import {CategoryApi} from "../../../services/category-api";
import {Listbox} from '@headlessui/react';

import './game-board-create-view.css';

const categories = [
    {id: 1, name: 'default'},
    {id: 2, name: 'Animals'},
    {id: 3, name: 'Birds'},
    {id: 4, name: 'Travel'},
    {id: 5, name: 'Movies'},
]

const boardSIze = ['Small', 'Medium', 'Large'];
const difficultyLevel = ['Easy', 'Medium', 'Hard']

export default class GameBoardCreateView extends React.Component {
    constructor(props) {
        super(props)

        this.category_api = new CategoryApi()


        this.state = {
            board_id: this.props.board_id || null,
            board_size: this.props.board_size || 2,
            difficulty_selected: this.props.difficulty_selected || false,
            difficulty: this.props.difficulty || 2,
            category_selected: this.props.category_selected || false,
            category: categories[0],
        }
    }

    changeCategory = (event) => {
        this.setState({
            category: event
        })
    }

    changeBoardSize = (category, val) => {
        if (category == "bs") {

            this.setState({
                board_size: val
            })
        } else if (category == "difficulty") {
            this.setState({
                difficulty: val
            })
        }

    }

    changeDifficulty = (category, val) => {
        this.setState({
            difficulty: val
        })
    }


    createBoard = async () => {
        const response = await this.gameboard_api.createBoard(
            this.room_id,
            this.state.category,
            this.state.board_size,
            this.state.difficulty
        );

    }

    componentDidMount = () => {

    }


    render() {

        return (
            <div style={{padding: "10px"}}>
                <div className="mb-4">
                    <label>
                        Board Size:
                    </label>
                    <div className="mt-2">
                        {
                            boardSIze.map((size, index) => (
                                <button
                                    className={`${this.state.board_size == index ? 'bg-dark-secondary' : 'bg-transparent'} border-2 border-light-secondary rounded px-2 py-1 mr-2`}
                                    onClick={() => this.changeBoardSize("bs", index)} key={"size-" + size}>
                                    {size}
                                </button>
                            ))
                        }
                    </div>

                </div>
                <div className="mb-4">
                    <label>
                        Difficulty Level:
                    </label>
                    <div className="mt-2">
                        {
                            difficultyLevel.map((level, i) => (
                                <button
                                    className={`${this.state.difficulty == i ? 'bg-dark-secondary' : 'bg-transparent'} border-2 border-light-secondary rounded px-2 py-1 mr-2`}
                                    onClick={() => this.changeBoardSize("difficulty", i)} key={"difficulty-" + level}>
                                    {level}
                                </button>
                            ))
                        }
                    </div>

                </div>
                <div className="mb-4">
                    <label className={`mr-4`}>Select Category:</label>
                    <Listbox value={this.state.category} onChange={this.changeCategory}>
                        <Listbox.Button>{this.state.category.name}</Listbox.Button>
                        <Listbox.Options className={`hover:cursor-pointer w-[250px]`}>
                            {categories.map((catefgory) => (
                                <Listbox.Option
                                    key={"category-" + catefgory.id}
                                    value={catefgory}
                                    className={`hover:bg-dark-secondary`}
                                >
                                    {catefgory.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </div>
                <button className={"bg-light-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                        onClick={this.createBoard}> Create Board
                </button>
            </div>
        )
    }
}
