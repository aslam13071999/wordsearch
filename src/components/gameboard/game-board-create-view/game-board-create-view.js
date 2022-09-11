import {Listbox, Transition} from '@headlessui/react';
import React, {Fragment} from 'react'
import {CategoryApi} from "../../../services/category-api";
import Styles from "../../../constants/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsUpDown} from "@fortawesome/free-solid-svg-icons";
import './game-board-create-view.css';
import {GameBoardApi} from "../../../services/game-board-api";

const boardSizes = ['Small', 'Medium', 'Large'];
const difficultyLevels = ['Easy', 'Medium', 'Hard']


export default class GameBoardCreateView extends React.Component {
    constructor(props) {
        super(props)

        this.categoryApi = new CategoryApi()
        this.gameboardApi = new GameBoardApi()

        this.categories = []
        this.state = {
            boardSize: this.props.boardSize || "Medium", difficulty: this.props.difficulty || "Medium", category: null
        }
    }

    componentDidMount = async () => {
        await this.loadCategories()
    }


    loadCategories = async () => {
        console.log("GameBoardCreateView.loadCategories loading categories")
        const response = await this.categoryApi.listCategories()
        console.log("GameBoardCreateView.loadCategories response", response)
        this.categories = response.data
        if (this.categories.length > 0) {
            console.log("updating state")
            this.setState({
                ...this.state, category: this.categories[0].name
            })
        }
    }


    createBoard = async () => {
        await this.gameboardApi.createBoard(this.props.room_id, this.state.category, this.state.boardSize, this.state.difficulty);
        this.props.on_create()
    }

    changeCategory = (category) => {
        this.setState({
            ...this.state, category: category
        })
    }

    changeBoardSize = (boardSize) => {
        this.setState({
            ...this.state, boardSize: boardSize
        })
    }

    changeBoardDifficulty = (level) => {
        this.setState({
            ...this.state, difficulty: level
        })
    }


    render() {
        return (
            <div style={{padding: "10px"}}>
                <div className="mb-4"> {this.renderBoardSize()} </div>
                <div className="mb-4"> {this.renderBoardDifficulty()} </div>
                <div className="mb-4"> {this.render_input_category()} </div>
                <button className={Styles.CLASSES_FOR_OUTLINE_BUTTON + " py-2 px-4"}
                        onClick={this.createBoard}> Create Board
                </button>
            </div>
        )
    }


    renderBoardSize = () => {
        return (
            <div>
                <label> Board Size: </label>
                <div className="mt-2">
                    {boardSizes.map((size) => {
                        let activeClassName = Styles.CLASSES_FOR_OUTLINE_BUTTON + " bg-light-active dark:bg-dark-active "
                        let nonActiveClassName = Styles.CLASSES_FOR_OUTLINE_BUTTON
                        return (
                            <button
                                className={(size === this.state.boardSize ? activeClassName : nonActiveClassName) + " px-2 py-1 mr-2"}
                                onClick={() => this.changeBoardSize(size)} key={"bs-" + size}>
                                {size}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }

    renderBoardDifficulty = () => {
        return (
            <div>
                <label> Difficulty Level: </label>
                <div className="mt-2">
                    {difficultyLevels.map((level) => {
                        let activeClassName = Styles.CLASSES_FOR_OUTLINE_BUTTON + " bg-light-primary dark:bg-dark-primary "
                        let nonActiveClassName = Styles.CLASSES_FOR_OUTLINE_BUTTON

                        return (
                            <button
                                className={(level === this.state.difficulty ? activeClassName : nonActiveClassName) + " px-2 py-1 mr-2"}
                                onClick={() => this.changeBoardDifficulty(level)} key={"d-" + level}>
                                {level}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    };


    render_input_category = () => {
        const dropDownIconStyle = "pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        const optionsStyle = "absolute max-h-56 w-64 overflow-auto py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-light-bg-color dark:bg-dark-bg-color shadow-light-shadow-color dark:shadow-dark-shadow-color"
        const optionStyle = "p-1 px-2 select-none "
        const activeOptionStyle = "relative bg-light-primary dark:bg-dark-primary " + optionStyle
        const inActiveOptionStyle = " " + optionStyle


        return (
            <div>
                <label> Category: </label>
                <Listbox value={this.state.category} onChange={this.changeCategory}>
                    {({open}) => (
                        <div className="relative mt-1">
                            <Listbox.Button className={Styles.CLASSES_FOR_OUTLINE_BUTTON + " relative rounded-md w-64 cursor-pointer p-1"}>
                                <span className="flex items-center"> {this.state.category} </span>
                                <span className={dropDownIconStyle}> <FontAwesomeIcon icon={faArrowsUpDown}/> </span>
                            </Listbox.Button>
                            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Listbox.Options className={optionsStyle}>
                                    {this.categories.map((category) => {
                                        return (
                                            <Listbox.Option className={({active}) => active ? activeOptionStyle : inActiveOptionStyle} key={"c-" + category.name} value={category.name} disabled={false}>
                                                {category.name}
                                            </Listbox.Option>
                                        )
                                    })}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    )}
                </Listbox>
            </div>
        )
    }

}
