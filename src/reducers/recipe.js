import { GET_RECIPE, RECEIVE_RECIPE, FAIL_RECIPE, CLEAR_RECIPE } from "../actions"
const initialState = {
    recipe: null,
    isLoading: false,
    error: null,
}

const searchFetching = (state) => {
    return {...state, isLoading: true }
}

const searchFetched = (state, payload) => {
    return {...state, isLoading: false, recipe: payload }
}

const searchFailed = (state, payload) => {
    return {...state, isLoading: false, error: payload }
}

const clearRecipe = (state) => {
    return {...state, isLoading: false }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_RECIPE:
            return searchFetching()
        case RECEIVE_RECIPE:
            return searchFetched(state, payload)
        case FAIL_RECIPE:
            return searchFailed(state, payload)
        case CLEAR_RECIPE:
            return clearRecipe()
        default:
            return state
    }
}