import {Component} from "react";
import {CategoryApi} from "../../../services/category-api";
import CategoryViewSmall from "../category-view-small/category-view-small";
import withRouter from "../../../routerUtil";


class CategoryList extends Component {

    constructor(props) {
        super(props);
        this.category_api = new CategoryApi()
        this.state = {
            categoryList: []
        }
    }

    getCategories = async () => {
        const response = await this.category_api.listCategories(true)
        this.setState({
            categoryList: response.data
        })
    }

    componentDidMount = async () => {
        await this.getCategories()
    }

    render = () => {
        return (
            <div>
                {
                    this.state.categoryList.map((category) => {
                        return (
                            <CategoryViewSmall name={category.name} description={category.description} key={category.name}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(CategoryList)
