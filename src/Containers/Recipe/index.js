// TODO Create a connected component to render a fetched recipe
import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"

class Recipe extends Component {
    constructor(props) {
        super(props)
    }
    fetchRecipe(id) {
        actions.findRecipe(id)
    }

    render() {
        const { recipe } = this.props
        console.log(recipe)
        return (
            <div>
                <h3>Recipe for {recipe.name}</h3>
                <h2>Instructions</h2>
                <p>{recipe.instructions}</p>
                <h2>Ingredients</h2>
                <List>
                    {recipe.ingredients.map((ingredient) => (
                    <ListItem key={ingredient.amount}>
                        <ListItemText primary={` ${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}/>
                    </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {recipe} = state
    return {...recipe}
}

const mapDispatchToProps = (dispatch) => 
bindActionCreators(
    {
        findRecipe: actions.findRecipe,
    },
    dispatch

)

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)